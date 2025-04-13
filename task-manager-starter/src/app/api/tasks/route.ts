import options from "@/config/auth";
import db from "@/db";
import { taskAssignments, tasks } from "@/db/schema";
import requireAuth from "@/utils/require-auth";
import { eq, inArray } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
    await requireAuth();
    const session = await getServerSession(options);

    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userEmail = session?.user?.email || "no user found";

    const assignments = await db.select().from(taskAssignments).where(eq(taskAssignments.userEmail, userEmail));

    const taskIds = assignments.map((a) => a.taskId);

    if (taskIds.length === 0) {
        return NextResponse.json({ tasks: [] });
    }

    const userTasks = await db.select().from(tasks).where(inArray(tasks.id, taskIds));

    return NextResponse.json(userTasks);
}