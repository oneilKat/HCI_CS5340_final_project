import db from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const id = await parseInt(params.id);
    const { status } = await req.json();

    const res = await db.update(tasks).set({ status }).where(eq(tasks.id, id)).returning();

    return NextResponse.json(res[0]);
}