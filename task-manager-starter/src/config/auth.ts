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
        console.log("[jwt callback] dbUser:", dbUser);
        token.level = dbUser.level;
      }
      return token;
    },

    async session({ session, token}: { session: any; token: any }) {
      console.log("[session callback] token:", token);
      if (token?.level) {
        session.user.level = token.level;
      } 
      return session; 
    }

  },
  session: {
    strategy: "jwt",
  }
};

export default options;
