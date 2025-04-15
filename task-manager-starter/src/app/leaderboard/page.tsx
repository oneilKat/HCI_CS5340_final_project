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

  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
      <Sidebar />

      <main className="flex-1 p-6 flex flex-col gap-6">
        <Levelbar />
        <div className="flex gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">LEADERBOARD</h2>
            <div className="flex flex-col gap-3">
              {leaderboard.map((user, index) => (
                <Card key={index}>
                  <CardBody className="flex justify-between p-4">
                    <Image
                          src={`/avatars/${user.avatar}.png`}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                    <span>🏅 {user.name}</span>
                    <span className="text-sm text-gray-600 font-medium">XP: {user.xp}</span>
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