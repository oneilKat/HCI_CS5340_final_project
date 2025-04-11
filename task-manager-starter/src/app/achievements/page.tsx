"use client";

import Sidebar from "@/components/sidebar/page";
import { Card, CardBody } from "@heroui/react";
import { Progress } from "@heroui/react";

const achievements = ["Badge 1", "Badge 2", "Badge 3", "Badge 4", "Badge 5"];

export default function TasksPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
        <Sidebar />
    {/* Main Content */}
    <main className="flex-1 p-6 flex flex-col gap-6">
          {/* Level Bar */}
          <div className="flex justify-between items-center">
          <div className="w-1/2">
            <div className="text-sm font-semibold">LEVEL 1</div>
            <Progress value={90} className="w-full mt-1" />
            <div className="text-xs mt-1 text-right text-gray-600">450 XP / 500 XP</div>
          </div>
        </div>
        {/* Achievement Badges*/}
        <div className="flex gap-6">
          {/* Tasks */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">ACHIEVEMENTS </h2>
            <div className="flex flex-col gap-3">
              {achievements.map((achievement, index) => (
                <Card key={index}>
                <CardBody className="flex justify-between p-4">
                  <span> {achievement}</span>
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