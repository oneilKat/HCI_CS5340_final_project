"use client";
import { getAvatars } from '@/utils/getAvatars'
import Sidebar from "@/components/sidebar/page";
import { Card, CardBody } from "@heroui/react";
import Image from "next/image";
import Levelbar from "@/components/level-bar/page";
import { AchieveCard } from "@/components/achieve-card/page";

type Achievement = {
  id: string;
  title: string;
  icon: string;
  description: string;
  userEmail: string;
};

const achievements: Achievement[] = [
  { id: "1", title: "Completed 10 tasks", icon: "🌟", description: "You completed 10 tasks. Keep it up!", userEmail: "user@example.com"},
  { id: "2", title: "Achieved level 5", icon: "🎮", description: "Congratulations on reaching level 5!", userEmail: "user@example.com"},
  { id: "3", title: "Completed a task in under 1 hour", icon: "⏱️", description: "You completed a task in under 1 hour. Speedy!", userEmail: "user@example.com"},
  { id: "4", title: "Achieved 100 XP", icon: "💯", description: "You earned 100 XP. Great progress!", userEmail: "user@example.com"},
  { id: "5", title: "Completed a week's worth of tasks", icon: "📅", description: "You completed all tasks for the week. Amazing consistency!", userEmail: "user@example.com"}
];

const avatars = getAvatars().map((avatar: any, index: number) => ({
  ...avatar,
  unlocked: index === 0 // Only first avatar is unlocked for level 1
}));

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col gap-2">
        {/* Level Bar */}
        <Levelbar />
        {/* Achievement Badges */}
        <div className="flex flex-col gap-2">
          <h2 className="mb-4 text-2xl font-semibold">ACHIEVEMENTS</h2>
          <div className="flex flex-col gap-2"> 
            {achievements.map((item, index) => (
              <AchieveCard key={index} achievement={item} />
            ))}
          </div>
        </div>

        {/* Avatars Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Available Avatars</h2>
          <div className="grid grid-cols-5 gap-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <div className={`w-30 h-30 rounded-full overflow-hidden border-4 
                  ${avatar.unlocked ? 'border-purple-400 hover:border-purple-600' : 'border-gray-400'} 
                  transition-colors relative`}>
                  <Image
                    src={avatar.image}
                    alt={avatar.name}
                    width={96}
                    height={96}
                    className={`object-cover ${!avatar.unlocked ? 'opacity-50' : ''}`}
                  />
                  {!avatar.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <span className="text-white text-sm font-semibold">LOCKED</span>
                    </div>
                  )}
                </div>
                <span className={`mt-2 text-sm font-medium text-center 
                  ${avatar.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                  {avatar.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}