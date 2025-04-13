import options from "@/config/auth";
import db from "@/db";
import { users } from "@/db/schema";
import { getUserByEmail } from "@/lib/db";
import requireAuth from "@/utils/require-auth";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await requireAuth();
    const session = await getServerSession(options);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const dbUser = await getUserByEmail(session.user.email);
    if (!dbUser) {
        return NextResponse.json("User not found", { status: 404 });
    }

    const userXp = dbUser.xp;

    return NextResponse.json({ xp: userXp }, { status: 200});
}

export async function PATCH(req: NextRequest) {
    await requireAuth();
    const session = await getServerSession(options);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }
    const dbUser = await getUserByEmail(session.user.email);
    if (!dbUser) {
        return NextResponse.json("User not found", { status: 404 });
    }
    
    try {
        const body =  await req.json();
        const { xp } = body;

        if (typeof xp !== "number") {
            return NextResponse.json("Invalid xp value", {status: 400});
        }

        const currentXp = dbUser.xp;
        const newXp = currentXp + xp;

        await db.update(users).set({ xp: newXp }).where(eq(users.email, session.user.email));

        return NextResponse.json({ message: "User xp updated successfully", xp: newXp }, { status: 200 });

    } catch (error) {
        console.error("Error updating user xp: ", error);
        return NextResponse.json("Error updating user xp", { status: 500});
    }
}