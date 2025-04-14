import db from "@/db";
import { taskAssignments, tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTaskByUser(id: string) {
    const res = await db.select().from(taskAssignments).where(eq(taskAssignments.userEmail, id)).limit(1);
    return res[0];
}

export async function getTaskIdByTitle(title: string) {
    const res = await db.select().from(tasks).where(eq(tasks.title, title)).limit(1);
    return res[0].id;
}

export async function markTaskComplete(taskId: string) {
    const res = await fetch("/api/tasks", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ taskId })
    });
    const data = await res.json();
    console.log("Task marked complete: ", data);
}