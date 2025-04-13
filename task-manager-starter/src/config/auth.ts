import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import db from "@/db";
import { env } from "@/env/server";
import { getUserByEmail } from "@/lib/db";

const options: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      console.log("[jwt callback] user:", user);
      console.log("[jwt callback] token:", token);
      if (user) {
        const dbUser = await getUserByEmail(user.email);
        token.level = dbUser.level;
        token.xp = dbUser.xp;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token}: { session: any; token: any }) {
      console.log("[session callback] session:", session);
      if (token?.level) {
        session.user.level = token.level;
      } 
      if (token?.xp) {
        session.user.xp = token.xp;
      }
      if (token) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session; 
    }

  },
  session: {
    strategy: "jwt",
  }
};

export default options;
