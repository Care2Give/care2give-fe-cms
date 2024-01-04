import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

const SUPERUSER_PATHS = ["/admin-controls", "/api/users"];
const DONATION_MANAGER_PATHS = ["/email-editor", "/donations"];

export default authMiddleware({
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = (auth?.sessionClaims?.public_metadata as { role: string })
      ?.role;
    if (
      role !== "superuser" &&
      SUPERUSER_PATHS.includes(req.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      role !== "donation-manager" &&
      role !== "superuser" &&
      DONATION_MANAGER_PATHS.includes(req.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  publicRoutes: ["/login"],
  // debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
