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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const parsed = postSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const isUnique = await db.isSlugUnique(parsed.data.slug, id);
    if (!isUnique) {
      return NextResponse.json(
        { error: { slug: ["A post with this slug already exists"] } },
        { status: 400 }
      );
    }

    const existing = await db.getPostById(id);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/admin/posts/[id] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await db.deletePost(id);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/posts/[id] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete post" },
      { status: 500 }
    );
  }
}
