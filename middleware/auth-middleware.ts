import { NextResponse, type NextRequest } from "next/server";

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;

  const isAuthPage = ["/auth/login", "/auth/register"].includes(pathname);
  const isProtectedPage = pathname.startsWith("/dashboard");

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
