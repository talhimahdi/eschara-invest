// import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const pathname = req.nextUrl.pathname;

      if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/waiting-page") ||
        pathname.startsWith("/reset-password")
      ) {
        return true;
      }

      if (token) {
        return true;
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
});



export async function middleware(request) {

  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/waiting-page") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin")

  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });


  if (token?.role == 'admin' || token?.role == 'manager') {
    return NextResponse.next();
  }

  if (token) {
    const res = await fetch(`${process.env.BACKEND_API_URL}/isbigboy`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.apiToken}`,
      },
    });

    const response = await res.json();

    if (response?.status && !response?.is_bigboy && !pathname.startsWith("/bigboy")) {
      const bigboyUrl = new URL("/bigboy", request.url);
      return NextResponse.redirect(bigboyUrl);
    }
    else if (response?.is_bigboy && pathname.startsWith("/bigboy")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  else {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();

}

