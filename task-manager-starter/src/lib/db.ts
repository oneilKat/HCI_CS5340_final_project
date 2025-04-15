import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAvatarFromName } from "./avatars";

export async function getUserByEmail(email: string) {
    const res = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return res[0];
}

export async function getAvatarByEmail(email: string) {
    const res = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return getAvatarFromName(res[0].avatar);
}