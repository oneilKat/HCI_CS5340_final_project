import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import db from "@/db";
import { env } from "@/env/server";
import { getUserByEmail } from "@/lib/db";
import { IntegerConfig } from "drizzle-orm/sqlite-core";

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
      if (user) {
        const dbUser = await getUserByEmail(user.email);
        console.log("DB User: ", dbUser);
        token.xp = dbUser.xp;
        token.email = user.email;
        token.name = user.name;
      }

      if (!token.xp) {
        const dbUser = await getUserByEmail(token.email as string);
        token.xp = dbUser?.xp;
      }
      return token;
    },

    async session({ session, token}: { session: any; token: any }) {
      if (token) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.xp = token.xp as number;
      }
      return session; 
    }

  },
  session: {
    strategy: "jwt",
  }
};

export default options;
