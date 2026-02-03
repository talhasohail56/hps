import { NextResponse } from "next/server";
import { getSession } from "@/lib/blog/session";
import * as db from "@/lib/blog/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const post = await db.getPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const nowPublished = !post.published;
    await db.updatePost(id, {
      published: nowPublished,
      publishedAt: nowPublished ? new Date().toISOString() : post.publishedAt,
    });

    return NextResponse.json({ success: true, published: nowPublished });
  } catch (err) {
    console.error("POST /api/admin/posts/[id]/publish error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to toggle publish" },
      { status: 500 }
    );
  }
}
