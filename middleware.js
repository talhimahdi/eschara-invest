import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const pathname = req.nextUrl.pathname;

      if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/images") ||
        pathname === "/favicon.ico" ||
        pathname.startsWith("/login")
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
