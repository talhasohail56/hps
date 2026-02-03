import fs from "fs/promises";
import path from "path";
import type { BlogPost, BlogDB } from "./types";

const IS_VERCEL = !!process.env.VERCEL;

/* ------------------------------------------------------------------ */
/*  Upstash Redis client (only used on Vercel)                         */
/* ------------------------------------------------------------------ */

let redis: import("@upstash/redis").Redis | null = null;

async function getRedis() {
  if (redis) return redis;
  const { Redis } = await import("@upstash/redis");
  redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
  return redis;
}

const REDIS_KEY = "blog:posts";

/* ------------------------------------------------------------------ */
/*  Local file-system paths (dev only)                                 */
/* ------------------------------------------------------------------ */

const LOCAL_PATH = path.join(process.cwd(), "data", "blog.json");

/* ------------------------------------------------------------------ */
/*  Simple write mutex for local file safety                           */
/* ------------------------------------------------------------------ */

let writeLock = false;

async function withWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  while (writeLock) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  writeLock = true;
  try {
    return await fn();
  } finally {
    writeLock = false;
  }
}

/* ------------------------------------------------------------------ */
/*  Low-level read / write                                             */
/* ------------------------------------------------------------------ */

async function readDB(): Promise<BlogDB> {
  if (IS_VERCEL) {
    try {
      const kv = await getRedis();
      const posts = await kv.get<BlogPost[]>(REDIS_KEY);
      return { posts: posts || [] };
    } catch (err) {
      console.error("Redis readDB error:", err);
      return { posts: [] };
    }
  }

  // Local dev: file system
  try {
    const data = await fs.readFile(LOCAL_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { posts: [] };
  }
}

async function writeDB(db: BlogDB): Promise<void> {
  if (IS_VERCEL) {
    try {
      const kv = await getRedis();
      await kv.set(REDIS_KEY, db.posts);
    } catch (err) {
      console.error("Redis writeDB error:", err);
      throw err;
    }
    return;
  }

  // Local dev: file system
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(db, null, 2), "utf-8");
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ------------------------------------------------------------------ */
/*  CRUD                                                               */
/* ------------------------------------------------------------------ */

export async function getAllPosts(): Promise<BlogPost[]> {
  const db = await readDB();
  return db.posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const db = await readDB();
  return db.posts.find((p) => p.id === id) ?? null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await readDB();
  return db.posts.find((p) => p.slug === slug && p.published) ?? null;
}

export async function isSlugUnique(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const db = await readDB();
  return !db.posts.some((p) => p.slug === slug && p.id !== excludeId);
}

export async function createPost(post: BlogPost): Promise<BlogPost> {
  return withWriteLock(async () => {
    const db = await readDB();
    db.posts.push(post);
    await writeDB(db);
    return post;
  });
}

export async function updatePost(
  id: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  return withWriteLock(async () => {
    const db = await readDB();
    const index = db.posts.findIndex((p) => p.id === id);
    if (index === -1) return null;
    db.posts[index] = {
      ...db.posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await writeDB(db);
    return db.posts[index];
  });
}

export async function deletePost(id: string): Promise<boolean> {
  return withWriteLock(async () => {
    const db = await readDB();
    const index = db.posts.findIndex((p) => p.id === id);
    if (index === -1) return false;
    db.posts.splice(index, 1);
    await writeDB(db);
    return true;
  });
}
