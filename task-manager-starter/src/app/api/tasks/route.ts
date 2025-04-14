import options from "@/config/auth";
import db from "@/db";
import { taskAssignments, tasks } from "@/db/schema";
import requireAuth from "@/utils/require-auth";
import { eq, inArray } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

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

export async function POST(req: NextRequest) {
    await requireAuth();
    const session = await getServerSession(options);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    try {
    const body = await req.json();
    const { title, dueDate, status, priority, managerEmail } = body;
    
    if (!title || !dueDate || !status || !priority || !managerEmail) {
        return NextResponse.json("Missing fields", { status: 400 });
    }

    const userEmail = session.user?.email;
    if (!userEmail) return NextResponse.json("Unauthorized", { status: 401 });

    const res = await db.insert(tasks).values({
        title: title || "",
        dueDate: dueDate || "",
        status: status || "",
        priority: priority || "",
        managerEmail: userEmail
    });

    return NextResponse.json({ success: true, res }, { status: 200 });

    } catch (error) {
        console.error("Error creating task", error);
        return NextResponse.json("Error creating task", { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    await requireAuth();
    const session = await getServerSession(options);
    
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { taskId } = body;

        if (!taskId) {
            return NextResponse.json({ error: "Missing taskId" }, {status: 400});
        }

        const res = await db.update(tasks).set({ status: "completed" }).where(eq(tasks.id, taskId));

        return NextResponse.json({ success: true, res }, { status: 200 });

    } catch (error) {
        console.error("Error updating task", error);
        return NextResponse.json("Error updating task", { status: 500 });
    }
}