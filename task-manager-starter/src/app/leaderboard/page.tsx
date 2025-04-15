"use client";

import Sidebar from "@/components/sidebar/page";
import { Card, CardBody } from "@heroui/react";
import Levelbar from "@/components/level-bar/page";

const team = ["Kathryn", "Justin", "Ahri", "Cody", "Saiph"];
const score = ["5000", "5000", "5000", "5000", "5000"];

export default function LeaderBoardPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
      <Sidebar />

      <main className="flex-1 p-6 flex flex-col gap-6">
        <Levelbar />
        <div className="flex gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">LEADERBOARD</h2>
            <div className="flex flex-col gap-3">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardBody className="flex justify-between p-4">
                    <span>🏅 {member}</span>
                    <span className="text-sm text-gray-600 font-medium">Score: {score[index]}</span>
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