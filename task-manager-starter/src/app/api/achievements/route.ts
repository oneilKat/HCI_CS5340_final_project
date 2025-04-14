import options from "@/config/auth";
import db from "@/db";
import { achievements } from "@/db/schema";
import requireAuth from "@/utils/require-auth";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { uuid } from "drizzle-orm/pg-core";

export async function GET() {
    await requireAuth();
    const session = await getServerSession(options);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const userEmail =  session?.user?.email || "no user found";

    const userAchievements = await db.select().from(achievements).where(eq(achievements.userEmail, userEmail));

    return NextResponse.json(userAchievements);
}

export async function POST(req: NextRequest) {
    await requireAuth();
    const session = await getServerSession(options);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, icon } = body;

    if (!title || !description || !icon) {
        return NextResponse.json("Missing fields", { status: 400 });
    }
    const userEmail = session.user?.email;
    if (!userEmail) return new Response("Unauthorized", { status: 401 });

    const res = await db.insert(achievements).values({
        title: title || "",
        description: description || "",
        icon: icon || "",
        userEmail: session?.user?.email || ""
    });

}