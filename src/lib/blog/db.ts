import fs from "fs/promises";
import path from "path";
import type { BlogPost, BlogDB } from "./types";

const IS_VERCEL = !!process.env.VERCEL;
const SOURCE_PATH = path.join(process.cwd(), "data", "blog.json");
const DB_PATH = IS_VERCEL ? path.join("/tmp", "blog.json") : SOURCE_PATH;

/* ------------------------------------------------------------------ */
/*  Copy build-time data to /tmp on first Vercel access                */
/* ------------------------------------------------------------------ */

let tmpReady = false;

async function ensureDB(): Promise<void> {
  if (!IS_VERCEL || tmpReady) return;
  try {
    await fs.access(DB_PATH);
  } catch {
    try {
      const data = await fs.readFile(SOURCE_PATH, "utf-8");
      await fs.writeFile(DB_PATH, data, "utf-8");
    } catch {
      await fs.writeFile(
        DB_PATH,
        JSON.stringify({ posts: [] }),
        "utf-8"
      );
    }
  }
  tmpReady = true;
}

/* ------------------------------------------------------------------ */
/*  Simple write mutex for safe concurrent access                      */
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
  await ensureDB();
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { posts: [] };
  }
}

async function writeDB(db: BlogDB): Promise<void> {
  await ensureDB();
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
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
