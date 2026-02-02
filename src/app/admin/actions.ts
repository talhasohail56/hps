"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/blog/session";
import * as db from "@/lib/blog/db";

/* ------------------------------------------------------------------ */
/*  Auth actions                                                       */
/* ------------------------------------------------------------------ */

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Invalid password" };
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();
  redirect("/admin/posts");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/*  Validation schema                                                  */
/* ------------------------------------------------------------------ */

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional().default(""),
  author: z.string().optional().default("Hydra Pool Services"),
  published: z.boolean().optional().default(false),
  seoTitle: z.string().optional().default(""),
  seoDescription: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
});

/* ------------------------------------------------------------------ */
/*  Post CRUD actions                                                  */
/* ------------------------------------------------------------------ */

export async function createPostAction(
  data: Record<string, unknown>
): Promise<{
  success?: boolean;
  post?: { id: string };
  error?: Record<string, string[]> | string;
}> {
  const session = await getSession();
  if (!session.isAdmin) return { error: "Unauthorized" };

  const parsed = postSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const isUnique = await db.isSlugUnique(parsed.data.slug);
  if (!isUnique) {
    return { error: { slug: ["A post with this slug already exists"] } };
  }

  const now = new Date().toISOString();
  const post = {
    id: crypto.randomUUID(),
    ...parsed.data,
    coverImage: parsed.data.coverImage || "",
    author: parsed.data.author || "Hydra Pool Services",
    seoTitle: parsed.data.seoTitle || "",
    seoDescription: parsed.data.seoDescription || "",
    tags: parsed.data.tags || [],
    publishedAt: parsed.data.published ? now : null,
    createdAt: now,
    updatedAt: now,
    readingTime: db.calculateReadingTime(parsed.data.content),
  };

  await db.createPost(post);
  return { success: true, post: { id: post.id } };
}

export async function updatePostAction(
  id: string,
  data: Record<string, unknown>
): Promise<{
  success?: boolean;
  error?: Record<string, string[]> | string;
}> {
  const session = await getSession();
  if (!session.isAdmin) return { error: "Unauthorized" };

  const parsed = postSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const isUnique = await db.isSlugUnique(parsed.data.slug, id);
  if (!isUnique) {
    return { error: { slug: ["A post with this slug already exists"] } };
  }

  const existing = await db.getPostById(id);
  if (!existing) return { error: "Post not found" };

  const wasPublished = existing.published;
  const nowPublished = parsed.data.published;

  await db.updatePost(id, {
    ...parsed.data,
    coverImage: parsed.data.coverImage || "",
    author: parsed.data.author || "Hydra Pool Services",
    seoTitle: parsed.data.seoTitle || "",
    seoDescription: parsed.data.seoDescription || "",
    tags: parsed.data.tags || [],
    publishedAt:
      nowPublished && !wasPublished
        ? new Date().toISOString()
        : existing.publishedAt,
    readingTime: db.calculateReadingTime(parsed.data.content),
  });

  return { success: true };
}

export async function deletePostAction(
  id: string
): Promise<{ success?: boolean; error?: string }> {
  const session = await getSession();
  if (!session.isAdmin) return { error: "Unauthorized" };

  const deleted = await db.deletePost(id);
  if (!deleted) return { error: "Post not found" };
  return { success: true };
}

export async function togglePublishAction(
  id: string
): Promise<{ success?: boolean; published?: boolean; error?: string }> {
  const session = await getSession();
  if (!session.isAdmin) return { error: "Unauthorized" };

  const post = await db.getPostById(id);
  if (!post) return { error: "Post not found" };

  const nowPublished = !post.published;
  await db.updatePost(id, {
    published: nowPublished,
    publishedAt: nowPublished ? new Date().toISOString() : post.publishedAt,
  });

  return { success: true, published: nowPublished };
}
