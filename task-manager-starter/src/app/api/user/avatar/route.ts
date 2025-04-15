import options from "@/config/auth";
import db from "@/db";
import { users } from "@/db/schema";
import { getUserByEmail } from "@/lib/db";
import requireAuth from "@/utils/require-auth";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

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
        const { avatar } = body;

        if (typeof avatar !== "string") {
            return NextResponse.json("Invalid avatar value", {status: 400});
        }

        await db.update(users).set({ avatar: avatar }).where(eq(users.email, session.user.email));

        return NextResponse.json({ message: "User avatar updated successfully", avatar: avatar }, { status: 200 });

    } catch (error) {
        console.error("Error updating user xp: ", error);
        return NextResponse.json("Error updating user avatar", { status: 500});
    }
}