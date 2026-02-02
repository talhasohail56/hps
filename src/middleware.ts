import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";

interface SessionData {
  isAdmin?: boolean;
}

const sessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "complex_password_at_least_32_characters_long_x",
  cookieName: "hps-admin-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Allow the login page through */
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  /* Protect every other /admin route */
  if (pathname.startsWith("/admin")) {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    );

    if (!session.isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
