import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth";

export async function middleware(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login?from=${request.nextUrl.pathname}`, request.url)
    );
  }
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL(`/`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/cattle", "/my-cattles", "/login"],
};
