import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set(name, value, options);
        },
        remove(name: string, options: any) {
          res.cookies.set(name, "", { ...options, maxAge: -1 });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = req.nextUrl.pathname;
  const protectedRoutes = ["/admin", "/user"];

  if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = data?.role;

    if (role === "admin" && pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (role === "user" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/user", req.url));
    }

    if (pathname === "/auth") {
      const redirectTo = role === "admin" ? "/admin" : "/user";
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/auth", "/"],
};
