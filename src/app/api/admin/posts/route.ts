import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/blog/session";
import * as db from "@/lib/blog/db";

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

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const parsed = postSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const isUnique = await db.isSlugUnique(parsed.data.slug);
    if (!isUnique) {
      return NextResponse.json(
        { error: { slug: ["A post with this slug already exists"] } },
        { status: 400 }
      );
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
    return NextResponse.json({ success: true, post: { id: post.id } });
  } catch (err) {
    console.error("POST /api/admin/posts error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create post" },
      { status: 500 }
    );
  }
}
