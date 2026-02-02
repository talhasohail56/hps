"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ title, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <button
            onClick={onCancel}
            className="rounded-lg p-1 text-[#6B7B94] hover:bg-[#F1F5F9]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h3 className="mb-1 text-base font-semibold text-[#0B1B2B]">
          Delete Post
        </h3>
        <p className="mb-5 text-sm text-[#6B7B94]">
          Are you sure you want to delete &ldquo;{title}&rdquo;? This action
          cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#445266] transition-colors hover:bg-[#F1F5F9]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
