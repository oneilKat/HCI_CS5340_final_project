import db from "@/db";
import { achievements } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAchievementsByEmail(email: string) {
    const res = await db.select().from(achievements).where(eq(achievements.userEmail, email)).limit(1);
    return res[0];
}