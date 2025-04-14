import options from "@/config/auth";
import { getUserByEmail } from "@/lib/db";
import requireAuth from "@/utils/require-auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
    await requireAuth();
    const session = await getServerSession(options);
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const dbUser = await getUserByEmail(session.user.email);

    return NextResponse.json(dbUser);
}