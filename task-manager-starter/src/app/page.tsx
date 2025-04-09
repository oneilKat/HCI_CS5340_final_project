"use client";

import { Progress } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import { Avatar } from "@heroui/react";
import { Badge } from "@heroui/react";

const tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];
const achievements = ["Achievement 1", "Achievement 2", "Achievement 3"];

export default function DashboardPage() {
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

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col gap-6">
        {/* Level Bar */}
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <div className="text-sm font-semibold">LEVEL 3</div>
            <Progress value={90} className="w-full mt-1" />
            <div className="text-xs mt-1 text-right text-gray-600">450 XP / 500 XP</div>
          </div>
        </div>

        {/* Task + Avatar */}
        <div className="flex gap-6">
          {/* Tasks */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">TODAY’S TASKS</h2>
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <Card key={index}>
                  <CardBody className="flex justify-between p-4">
                    <span>⬜ {task}</span>
                    <span className="text-sm text-gray-500">DUE: </span>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Avatar + Achievements */}
          <div className="w-80 flex flex-col items-center">
            <Avatar
              src="/wizard.png"
              alt="Wizard Avatar"
              className="w-40 h-40 mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">ACHIEVEMENTS</h2>
            <div className="flex flex-col gap-2 w-full">
              {achievements.map((item, index) => (
                <Card key={index} className="bg-yellow-100">
                  <CardBody className="p-3 flex gap-2 items-center">
                    <span className="text-yellow-500 text-lg">⬢</span>
                    <span>{item}</span>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}