"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    /* loginAction redirects on success; reaching here means error */
    if (result?.error) setError(result.error);
    setLoading(false);
  }

  return (
    <div className="w-full max-w-sm px-4">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F7FD]">
          <Lock className="h-5 w-5 text-[#1E9AC4]" />
        </div>

        <h1 className="mb-1 text-center text-xl font-bold text-[#0B1B2B]">
          Admin Login
        </h1>
        <p className="mb-6 text-center text-sm text-[#6B7B94]">
          Enter the admin password to continue.
        </p>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#0B1B2B]">
            Password
          </label>
          <div className="relative mb-5">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoFocus
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 pr-10 text-sm text-[#0B1B2B] outline-none transition-colors focus:border-[#27B6E6] focus:ring-2 focus:ring-[#27B6E6]/20"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7B94] hover:text-[#0B1B2B]"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27B6E6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E9AC4] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
