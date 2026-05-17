import fs from "fs/promises";
import path from "path";
import type { BlogPost, BlogDB } from "./types";

const IS_VERCEL = !!process.env.VERCEL;

/* ------------------------------------------------------------------ */
/*  GitHub API storage (used on Vercel)                                */
/* ------------------------------------------------------------------ */

const GH_TOKEN = process.env.GITHUB_TOKEN;
const GH_REPO = "talhasohail56/hps";
const GH_FILE = "data/blog.json";
const GH_API = `https://api.github.com/repos/${GH_REPO}/contents/${GH_FILE}`;

async function ghRead(): Promise<{ db: BlogDB; sha: string }> {
  const res = await fetch(`${GH_API}?t=${Date.now()}`, {
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[blog] GitHub read error:", res.status, await res.text());
    return { db: { posts: [] }, sha: "" };
  }

  const json = await res.json();

  // Files over 1 MB have empty content from Contents API.
  // Use Git Blobs API instead of download_url to avoid CDN caching.
  let raw: string;
  if (json.content) {
    raw = Buffer.from(json.content, "base64").toString("utf-8");
  } else if (json.sha) {
    // Fetch via Git Blobs API — no CDN cache, always fresh
    const blobUrl = `https://api.github.com/repos/${GH_REPO}/git/blobs/${json.sha}`;
    const blobRes = await fetch(blobUrl, {
      headers: {
        Authorization: `Bearer ${GH_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    });
    if (!blobRes.ok) {
      console.error("[blog] GitHub blob read error:", blobRes.status, await blobRes.text());
      return { db: { posts: [] }, sha: json.sha };
    }
    const blob = await blobRes.json();
    raw = Buffer.from(blob.content, "base64").toString("utf-8");
  } else {
    console.error("[blog] GitHub: no content or sha for", GH_FILE);
    return { db: { posts: [] }, sha: "" };
  }

  const db: BlogDB = JSON.parse(raw);
  console.log(`[blog] ghRead: ${db.posts.length} posts, sha=${json.sha.slice(0, 7)}`);
  return { db, sha: json.sha };
}

async function ghWrite(db: BlogDB, sha: string): Promise<void> {
  const json = JSON.stringify(db, null, 2);
  console.log(
    `[blog] ghWrite: ${db.posts.length} posts, sha=${sha.slice(0, 7)}, size=${json.length} bytes`
  );

  const content = Buffer.from(json, "utf-8").toString("base64");

  const res = await fetch(GH_API, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Update blog posts",
      content,
      sha,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[blog] ghWrite error:", res.status, body);
    throw new Error("Failed to save to GitHub");
  }

  console.log(`[blog] ghWrite: success, status=${res.status}`);
}

/* ------------------------------------------------------------------ */
/*  Local file-system paths (dev only)                                 */
/* ------------------------------------------------------------------ */

const LOCAL_PATH = path.join(process.cwd(), "data", "blog.json");

/* ------------------------------------------------------------------ */
/*  Simple write mutex                                                 */
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
  if (IS_VERCEL && GH_TOKEN) {
    const { db } = await ghRead();
    return db;
  }

  try {
    const data = await fs.readFile(LOCAL_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { posts: [] };
  }
}

async function writeDB(db: BlogDB): Promise<void> {
  if (IS_VERCEL) {
    if (!GH_TOKEN) {
      throw new Error(
        "GITHUB_TOKEN is not set. Add it to your Vercel environment variables to enable blog editing."
      );
    }
    console.log("[blog] writeDB: fetching current SHA before write...");
    const { sha } = await ghRead();
    if (!sha) {
      throw new Error("Failed to get current SHA from GitHub — cannot write");
    }
    await ghWrite(db, sha);
    return;
  }

  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(db), "utf-8");
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

export async function getPostByPreviousSlug(
  slug: string
): Promise<BlogPost | null> {
  const db = await readDB();
  return (
    db.posts.find(
      (p) => p.published && p.previousSlugs?.includes(slug)
    ) ?? null
  );
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
    const existing = db.posts[index];

    const slugChanged =
      typeof data.slug === "string" && data.slug !== existing.slug;
    const previousSlugs = slugChanged
      ? Array.from(
          new Set([...(existing.previousSlugs ?? []), existing.slug])
        ).filter((s) => s !== data.slug)
      : existing.previousSlugs;

    db.posts[index] = {
      ...existing,
      ...data,
      previousSlugs,
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
