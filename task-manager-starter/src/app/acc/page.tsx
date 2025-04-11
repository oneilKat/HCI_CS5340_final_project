"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Progress } from "@heroui/react";
import { Card, CardBody, Avatar, Button } from "@heroui/react";

const tasks = [
  { name: "Finish coding challenge", due: "Today" },
  { name: "Submit resume", due: "Tomorrow" },
  { name: "Practice TypeScript", due: "Friday" },
];

const navItems = [
  { label: "DASHBOARD", href: "/" },
  { label: "TASKS", href: "/tasks" },
  { label: "LEADERBOARD", href: "/leaderboard" },
  { label: "ACHIEVEMENTS", href: "/achievements" },
  { label: "PROFILE", href: "/profile" },
  { label: "ACCOUNT", href: "/account" },
];

export default function TasksPage() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-200 p-4 flex flex-col justify-between">
  <div className="flex flex-col gap-4">
    {navItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={`px-2 py-2 rounded ${
          pathname === item.href ? "bg-slate-300" : "hover:bg-slate-300"
        }`}
      >
        {item.label}
      </Link>
    ))}
  </div>


</aside>


      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col gap-6">
        {/* User Info + Progress */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar
              src="/avatars/wizard.png"
              alt="User Avatar"
              className="w-16 h-16"
            />
            <div>
              <div className="text-lg font-semibold">Wu Cody</div>
              <div className="text-sm text-gray-500">wucody59@gmail.com</div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-sm font-medium">LEVEL 1</div>
            <Progress value={70} className="w-full mt-1" />
            <div className="text-xs mt-1 text-right text-gray-600">450 XP / 500 XP</div>
          </div>
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Today’s Tasks</h2>
          <div className="flex flex-col gap-4">
            {tasks.map((task, index) => (
              <Card key={index}>
                <CardBody className="flex justify-between items-center p-4">
                  <span>⬜ {task.name}</span>
                  <span className="text-sm text-gray-500">DUE: {task.due}</span>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-auto">
          <Button
            className="bg-red-500 text-white hover:bg-red-600 w-full"
            onClick={() => alert("Logging out...")}
          >
            Log Out
          </Button>
        </div>
      </main>
    </div>
  );
}
