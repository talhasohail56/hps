"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "../actions";

const navItems = [
  { label: "Dashboard", href: "/admin/posts", icon: LayoutDashboard },
  { label: "All Posts", href: "/admin/posts", icon: FileText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  /* Lock body scroll so the site behind the overlay can't scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden bg-[#F1F5F9]">
      {/* ---- Sidebar (desktop) ---- */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[#E2E8F0] bg-white md:flex">
        {/* Brand */}
        <div className="flex h-14 items-center gap-2 border-b border-[#E2E8F0] px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#27B6E6] text-white">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-[#0B1B2B]">Blog Admin</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#E8F7FD] text-[#1E9AC4]"
                    : "text-[#445266] hover:bg-[#F1F5F9] hover:text-[#0B1B2B]"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-[#E2E8F0] px-3 py-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[#445266] transition-colors hover:bg-[#F1F5F9] hover:text-[#0B1B2B]"
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[#445266] transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* ---- Main content ---- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex h-14 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#27B6E6] text-white">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-bold text-[#0B1B2B]">Blog Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/posts"
              className="rounded-lg p-2 text-[#445266] hover:bg-[#F1F5F9]"
            >
              <LayoutDashboard className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="rounded-lg p-2 text-[#445266] hover:bg-[#F1F5F9]"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg p-2 text-[#445266] hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
