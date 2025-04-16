"use client";

import Sidebar from "@/components/sidebar/page";
import { Card, CardBody } from "@heroui/react";
import Levelbar from "@/components/level-bar/page";
import { useEffect, useState } from "react";
import Image from "next/image";

type LeaderboardUser = {
  name: string;
  avatar: string;
  xp: number;
}

export default function LeaderBoardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect (() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Calculate team XP, number of employees, and top performer
  const totalXp = leaderboard.reduce((total, user) => total + user.xp, 0);
  const numEmployees = leaderboard.length;
  
  // Set default top performer to first in leaderboard if available
  const topPerformer = leaderboard.length > 0 
    ? leaderboard.reduce((top, user) => (user.xp > top.xp ? user : top), leaderboard[0])
    : { name: '', avatar: '', xp: 0 };

  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
      <Sidebar />

      <main className="flex-1 p-6 flex flex-col gap-6">
        <Levelbar />
        <div className="flex gap-6">
          {/* Leaderboard Section */}
          <div className="flex-1">
            <h2 className="text-2xl text-center  font-semibold mb-4">LEADERBOARD 🏆</h2>
            <div className="flex flex-col gap-3">
              {leaderboard.map((user, index) => (
                <Card key={index}>
                  <CardBody className="flex justify-between items-left p-4">
                    {/* Rank + Avatar + Name */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-gray-700 w-6 text-right">{index + 1}.</span>
                      <Image
                        src={`/avatars/${user.avatar}.png`}
                        alt={user.name}
                        width={45}
                        height={45}
                        className="rounded-full"
                      />
                      <span className="text-lg font-semibold">🏅 {user.name}</span>
                    </div>
                    {/* XP */}
                    <span className="text-md mt-2 text-black-800 font-medium">
                      Total XP: {user.xp}
                    </span>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Stats Section */}
          <div className="w-1/3">
            <h2 className="text-2xl text-center  font-semibold mb-4">TEAM STATS 📊</h2>
            <div className="flex flex-col gap-3">
              <Card>
                <CardBody className="p-4">
                  <h3 className="text-lg font-semibold">Total Team XP:</h3>
                  <p className="text-xl text-blue-800 font-medium">{totalXp}</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="p-4">
                  <h3 className="text-lg font-semibold">Number of Employees:</h3>
                  <p className="text-xl text-blue-800 font-medium">{numEmployees}</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="p-4">
                  <h3 className="text-lg mb-2 font-semibold">Top Performer:</h3>
                  <div className="flex items-center gap-3">
                    {topPerformer.avatar && (
                      <Image
                        src={`/avatars/${topPerformer.avatar}.png`}
                        alt={topPerformer.name}
                        width={45}
                        height={45}
                        className="rounded-full"
                      />
                    )}
                    <p className="text-xl font-semibold">{topPerformer.name} 🏆</p>
                    <p className="text-md font-medium">XP: {topPerformer.xp}</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}