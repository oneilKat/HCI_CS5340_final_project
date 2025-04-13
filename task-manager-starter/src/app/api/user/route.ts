import options from "@/config/auth";
import db from "@/db";
import { users } from "@/db/schema";
import requireAuth from "@/utils/require-auth";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await requireAuth();
    const session = await getServerSession(options);
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(session.user);
}