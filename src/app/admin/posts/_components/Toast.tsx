"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[300] animate-[slideUp_0.3s_ease-out]">
      <div
        className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 shadow-lg ${
          type === "success"
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-red-200 bg-red-50 text-red-800"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="h-4 w-4 shrink-0" />
        ) : (
          <XCircle className="h-4 w-4 shrink-0" />
        )}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 rounded p-0.5 hover:opacity-70">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
