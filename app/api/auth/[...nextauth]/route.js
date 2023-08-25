import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        const { email, password } = credentials;

        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }).then((data) => data.json());

        if (typeof res !== "undefined" && res.user) {
          return { ...res.user, apiToken: res.token };
        } else
          throw new Error(
            JSON.stringify({ error: res.error.message, status: false })
          );
        // return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
    },
  },

  session: { strategy: "jwt" },
  // session: {
  //   jwt: true,
  // },
  // jwt: {
  //   encryption: false,
  // },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
