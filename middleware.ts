import { getToken } from "next-auth/jwt";
import authMiddleware, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequestWithAuth) {
  if (req.nextUrl.pathname === "/") {
    const isSignedIn = await getToken({ req });
    if (isSignedIn) {
      return NextResponse.rewrite(new URL("/dashboard", req.url));
    }
  } else if (req.nextUrl.pathname === "/auth/signin") {
    const isSignedIn = await getToken({ req });
    if (isSignedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (req.nextUrl.pathname.startsWith("/account") || req.nextUrl.pathname.startsWith("/dashboard")) {
    return authMiddleware(req);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/account/:path*", "/auth/:path*"]
};
