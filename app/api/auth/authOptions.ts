import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User as NextAuthUser } from "next-auth";
import { UserType } from "@/app/shared/types/profileType";

// Переопределенный тип для пользователя
type CustomUser = UserType & NextAuthUser;

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        code: { label: "code", type: "code", required: true },
        token: { label: "token", type: "token", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.code) return null;

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

        const userData: CustomUser = await isVerify.json();
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.accessToken = user.acessToken;
        token.refreshToken = user.refreshToken;
        token.activeSubscriptions = user.activeSubscriptions;
        token.phone = user.phone;
      }

      if (trigger === "update") {
        token.accessToken = session.accessToken;
        token.refreshToken = session.refreshToken;
        token.activeSubscriptions = session.activeSubscriptions;
        token.phone = session.phone;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.activeSubscriptions = token.activeSubscriptions;
      session.phone = token.phone;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
