import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Public routes
  if (
    pathname === "/api/seed" ||
    pathname === "/api/auth/login" ||
    pathname.startsWith("/login")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  const isApiRoute = pathname.startsWith("/api");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // 🔒 Require token presence only
  if (isApiRoute || isDashboardRoute) {
    if (!token) {
      if (isApiRoute) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
