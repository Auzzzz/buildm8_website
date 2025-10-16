import { NextResponse } from "next/server";
import { auth } from "~/server/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Allow access to auth-related pages
  const isAuthPage = nextUrl.pathname.startsWith("/auth");
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");

  // Allow access to auth pages and auth API routes
  if (isAuthPage || isApiAuthRoute) {
    return NextResponse.next();
  }

  // Check if user has authentication errors (like expired token)
  if (req.auth?.error === "RefreshAccessTokenError") {
    // Redirect to sign in if refresh token is also expired
    const signInUrl = new URL("/auth/signin", nextUrl.origin);
    signInUrl.searchParams.set("error", "TokenExpired");
    return NextResponse.redirect(signInUrl);
  }

  // Redirect to sign in if not logged in
  if (!isLoggedIn) {
    const signInUrl = new URL("/auth/signin", nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};