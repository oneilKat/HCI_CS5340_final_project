import db from "@/db";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const topUsers = await db.
            select({
                name: users.name,
                avatar: users.avatar,
                xp: users.xp
            })
            .from(users)
            .orderBy(desc(users.xp))
            .limit(10);

        return NextResponse.json(topUsers, { status: 200 });
    } catch (error) {
        console.error("Error fetching leaderboard: ", error);
        return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
    }
}