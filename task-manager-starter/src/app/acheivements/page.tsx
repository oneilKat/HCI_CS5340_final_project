"use client";

import { Progress } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import { Avatar } from "@heroui/react";

export default function AchievementsPage() {
  return (
    <div className="flex h-screen bg-slate-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-200 p-4 flex flex-col gap-4">
        <button className="text-left px-2 py-2 hover:bg-slate-300 rounded">DASHBOARD</button>
        <button className="text-left px-2 py-2 hover:bg-slate-300 rounded">TASKS</button>
        <button className="text-left px-2 py-2 hover:bg-slate-300 rounded">LEADERBOARD</button>
        <button className="text-left px-2 py-2 hover:bg-slate-300 rounded">ACHIEVEMENTS</button>
        <button className="text-left px-2 py-2 hover:bg-slate-300 rounded">PROFILE</button>
      </aside>
    </div>
  );
}