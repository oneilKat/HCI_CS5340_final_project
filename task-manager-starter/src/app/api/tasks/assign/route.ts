import options from "@/config/auth";
import db from "@/db";
import { taskAssignments } from "@/db/schema";
import { getTaskIdByTitle } from "@/lib/tasks";
import requireAuth from "@/utils/require-auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await requireAuth();
    const session = await getServerSession(options);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }
    try {
        const body = await req.json();
        const { taskTitle, userEmail } = body;
        const taskId = await getTaskIdByTitle(taskTitle);

        const res = db.insert(taskAssignments).values({
            taskId: taskId || "",
            userEmail: userEmail || ""
        });

        return NextResponse.json({ success: true, res }, { status: 200 });
    } catch (error) {
        console.error("Error assigning task", error);
        return NextResponse.json("Error assigning task", { status: 500 });
    }
}