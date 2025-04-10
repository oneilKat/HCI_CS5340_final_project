// types/next-auth.d.ts

declare module "next-auth" {
  interface Session {
    user: {
      level?: number; // or string, depending on your schema
    } & DefaultSession["user"];
  }

  interface JWT {
    level?: number;
  }
}
