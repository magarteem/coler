import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        code: { label: "code", type: "code", required: true },
        token: { label: "token", type: "token", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.code) return null;
        // Здесь должна быть логика проверки пользователя (например, запрос к API)

        const isVerify = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + `/auth/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${credentials.token} `,
            },
            body: JSON.stringify({ code: credentials.code }),
          }
        );

        if (!isVerify.ok) {
          throw new Error(`Ошибка HTTP: ${isVerify.status}`);
        }

        const m = await isVerify.json();
        console.log("isVerifi =======================", m);
        return m;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.acessToken;
        token.refreshToken = user.refreshToken;
        token.activeSubscriptions = user.activeSubscriptions;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.activeSubscriptions = token.activeSubscriptions;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
