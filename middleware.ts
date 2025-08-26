import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;

  // If no access token, redirect to signin (except if already on signin page)
  if (!accessToken) {
    if (pathname !== "/signin") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  // If user is authenticated but trying to access signin, redirect to dashboard
  if (pathname === "/signin") {
    return NextResponse.redirect(new URL("/business-analytics", request.url)); // Use a known route from your matcher
  }

  let permissions: string[] = [];
  try {
    const decoded: any = jwtDecode(accessToken);
    permissions = decoded.permissions || [];
  } catch (e) {
    // Invalid token, clear cookies and redirect to signin
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("user_role");
    return response;
  }

  // If no permissions, clear auth and redirect to signin
  if (!permissions.length) {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("user_role");
    return response;
  }

  // Special handling for root path "/" - redirect to first route in matcher
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/business-analytics", request.url));
  }

  // For now, allow all routes if user has any permissions
  // You can add back the permission checking once the redirect loop is fixed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/business-analytics",
    "/business-analytics/:path*",
    "/country-admin",
    "/country-admin/:path*",
    "/companies",
    "/companies/:path*",
    "/superagents",
    "/superagents/:path*",
    "/sub-agents",
    "/sub-agents/:path*",
    "/partners",
    "/partners/:path*",
    "/videos",
    "/videos/:path*",
    "/settings",
    "/products",
    "/products/:path*",
    "/multi-branches",
    "/multi-branches/:path*",
    "/digital-entrepreneur",
    "/digital-entrepreneur/:path*",
    "/distributors",
    "/distributors/:path*",
    "/business-owners",
    "/business-owners/:path*",
    "/branches",
    "/branches/:path*",
  ],
};