import db from "@/db";
import { taskAssignments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTaskByUser(id: string) {
    const res = await db.select().from(taskAssignments).where(eq(taskAssignments.userId, id)).limit(1);
    return res[0];
}