import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { routes } from "./config/routes";

const protectedRoutes = [routes.admin.dashboard];
const publicRoutes = [routes.adminLogin];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const accessToken = cookies().get("act")?.value;

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (accessToken) {
    const { status }: any = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth-check`, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => res.json())
      .catch(() => null);

    if (isProtectedRoute && status === false) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublicRoute && status && !req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
