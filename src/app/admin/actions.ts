"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/blog/session";

/* ------------------------------------------------------------------ */
/*  Auth actions                                                       */
/* ------------------------------------------------------------------ */

export async function loginAction(formData: FormData) {
  const password = (formData.get("password") as string)?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD is not configured on the server." };
  }

  if (password !== adminPassword) {
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
