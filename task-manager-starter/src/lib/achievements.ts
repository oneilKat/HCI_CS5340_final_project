import db from "@/db";
import { achievements } from "@/db/schema";
import { eq } from "drizzle-orm";

type Achievement = {
    id: string;
    title: string;
    icon: string;
    description: string;
    userEmail: string;
  };

export async function getAchievementsByEmail(email: string) {
    const res = await db.select().from(achievements).where(eq(achievements.userEmail, email)).limit(1);
    return res[0];
}

export const allAchievements: Achievement[] = [
  { id: "1", title: "Completed 10 tasks", icon: "🌟", description: "You completed 10 tasks. Keep it up!", userEmail: "user@example.com"},
  { id: "2", title: "Achieved level 5", icon: "🎮", description: "Congratulations on reaching level 5!", userEmail: "user@example.com"},
  { id: "3", title: "Completed a task in under 1 hour", icon: "⏱️", description: "You completed a task in under 1 hour. Speedy!", userEmail: "user@example.com"},
  { id: "4", title: "Achieved 100 XP", icon: "💯", description: "You earned 100 XP. Great progress!", userEmail: "user@example.com"},
  { id: "5", title: "Completed a week's worth of tasks", icon: "📅", description: "You completed all tasks for the week. Amazing consistency!", userEmail: "user@example.com"}
];