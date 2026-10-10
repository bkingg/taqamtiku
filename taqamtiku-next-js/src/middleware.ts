import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

// Edge-safe: built from authConfig only, never from the full @/lib/auth
// (which imports the Sanity write client and bcrypt for the Credentials
// provider's authorize()). Middleware only needs to read/verify the JWT.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAdminPage =
    nextUrl.pathname.startsWith("/admin") &&
    nextUrl.pathname !== "/admin/login";
  const isOrderStatusWrite =
    nextUrl.pathname.startsWith("/api/orders/") && req.method === "PATCH";

  if (!isLoggedIn && isOrderStatusWrite) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  if (!isLoggedIn && isAdminPage) {
    const loginUrl = new URL("/admin/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/orders/:path*"],
};
