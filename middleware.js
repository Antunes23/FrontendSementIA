import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");

  const isLogged = token && token.value && token.value.length > 5;

  const url = req.nextUrl.pathname;

  // Se tentar acessar /dashboard sem login → redireciona
  if (!isLogged && url.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
