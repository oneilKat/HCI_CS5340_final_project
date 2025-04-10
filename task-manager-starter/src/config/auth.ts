import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import { users } from "@/db/schema";
import GoogleProvider from "next-auth/providers/google";
import { eq } from "drizzle-orm";

import db from "@/db";
import { env } from "@/env/server";

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
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.select().from(users).where(eq(users.id, user?.id)).limit(1);
        token.level = dbUser.level;
      }
      return token;
    },

    async session({ session, token}) {
      if (token?.level) {
        session.user.level = token.level;
      } 
      return session;
    }

},
};

export default options;
