"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog/types";
import { DeleteModal } from "./DeleteModal";
import { Toast } from "./Toast";

type Filter = "all" | "published" | "draft";

interface PostListProps {
  posts: BlogPost[];
}

export function PostList({ posts: initialPosts }: PostListProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
    },
    []
  );

  /* ---- Filtering ---- */
  const filtered = initialPosts.filter((post) => {
    if (filter === "published" && !post.published) return false;
    if (filter === "draft" && post.published) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  /* ---- Actions ---- */
  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/posts/${deleteTarget.id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        showToast("Post deleted", "success");
        router.refresh();
      } else {
        showToast(result.error || "Failed to delete", "error");
      }
    } catch {
      showToast("Failed to delete", "error");
    }
    setDeleteTarget(null);
  }

  async function handleTogglePublish(post: BlogPost) {
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/publish`, { method: "POST" });
      const result = await res.json();
      if (result.success) {
        showToast(
          result.published ? "Post published" : "Post unpublished",
          "success"
        );
        router.refresh();
      } else {
        showToast(result.error || "Failed to update", "error");
      }
    } catch {
      showToast("Failed to update", "error");
    }
  }

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Drafts", value: "draft" },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0B1B2B]">Blog Posts</h1>
          <p className="mt-0.5 text-sm text-[#6B7B94]">
            {initialPosts.length} total post{initialPosts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#27B6E6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E9AC4]"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7B94]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-4 text-sm text-[#0B1B2B] outline-none transition-colors focus:border-[#27B6E6] focus:ring-2 focus:ring-[#27B6E6]/20"
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-[#E2E8F0] bg-white p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.value
                  ? "bg-[#E8F7FD] text-[#1E9AC4]"
                  : "text-[#6B7B94] hover:text-[#0B1B2B]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E2E8F0] bg-white py-16 text-center">
          <p className="text-sm font-medium text-[#6B7B94]">
            {search || filter !== "all" ? "No posts match your filter" : "No posts yet"}
          </p>
          {!search && filter === "all" && (
            <Link
              href="/admin/posts/new"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#27B6E6] hover:text-[#1E9AC4]"
            >
              <Plus className="h-4 w-4" />
              Create your first post
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="group flex items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 transition-colors hover:border-[#27B6E6]/30"
            >
              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="truncate text-sm font-semibold text-[#0B1B2B] hover:text-[#1E9AC4]"
                  >
                    {post.title}
                  </Link>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    )}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mb-1.5 truncate text-xs text-[#6B7B94]">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B7B94]">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} min read
                  </span>
                  {post.tags.length > 0 && (
                    <span className="text-[#27B6E6]">
                      {post.tags.slice(0, 3).join(", ")}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => handleTogglePublish(post)}
                  title={post.published ? "Unpublish" : "Publish"}
                  className="rounded-lg p-2 text-[#6B7B94] transition-colors hover:bg-[#F1F5F9] hover:text-[#0B1B2B]"
                >
                  {post.published ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="rounded-lg p-2 text-[#6B7B94] transition-colors hover:bg-[#F1F5F9] hover:text-[#0B1B2B]"
                  title="Edit"
                >
                  <Edit3 className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => setDeleteTarget(post)}
                  className="rounded-lg p-2 text-[#6B7B94] transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
