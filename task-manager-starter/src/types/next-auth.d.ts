declare module "next-auth/next" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      xp: number; // Ensure xp is part of the session
    };
  }

  interface User {
    email: string;
    name: string;
    image: string;
    xp: number; // Ensure xp is part of the user object
  }
}
