import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import { users } from "@/db/schema";
import GoogleProvider from "next-auth/providers/google";
import { eq } from "drizzle-orm";

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
      if (user) {
        const dbUser = await getUserByEmail(user.email);
        token.level = dbUser.level;
        token.xp = dbUser.xp;
      }
      return token;
    },

    async session({ session, token}: { session: any; token: any }) {
      if (token?.level) {
        session.user.level = token.level;
      } 
      if (token?.xp) {
        session.user.xp = token.xp;
      }
      return session; 
    }

  },
  session: {
    strategy: "jwt",
  }
};

export default options;
