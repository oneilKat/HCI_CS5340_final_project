"use client";

import Sidebar from "@/components/sidebar/page";
import Image from "next/image";
import Levelbar from "@/components/level-bar/page";
import { AchieveCard } from "@/components/achieve-card/page";
import { useState, useEffect } from "react";
import { avatarOptions, handleAvatarClick } from "@/lib/avatars";

type Achievement = {
  id: string;
  title: string;
  icon: string;
  description: string;
  userEmail: string;
};

type AvatarWithUnlock = {
  name: string;
  image: string;
  unlocked: boolean;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  useEffect (() => {
    const fetchAchievements = async () => {
      try {
        const res =  await fetch("/api/achievements");
        const data = await res.json();
  
        setAchievements(data);
      } catch (error) {
        console.error("Failed to fetch achievements", error);
      }
    };
  
    fetchAchievements();
  }, []);

  const [avatars, setAvatars] = useState<AvatarWithUnlock[]>([]);

  useEffect(() => {
    const fetchXp = async () => {
      try {
        const res = await fetch("/api/user/xp");
        const data = await res.json();

        const unlockedAvatars = avatarOptions.map((avatar) => ({
          ...avatar,
          unlocked: data.xp >= avatar.xpRequired
        }));

        setAvatars(unlockedAvatars);

      } catch (error) {
        console.error("Unable to fetch xp: ", error);
      }
    };

    fetchXp();
  }, []);
    
  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col gap-4">
        {/* Level Bar */}
        <Levelbar />
        {/* Achievement Badges */}
        <div className="flex flex-col gap-6">
          <h2 className="mb-3 text-2xl font-semibold text-center text-gray-700">ACHIEVEMENTS</h2>
          <div className="flex flex-col gap-6"> 
            {achievements.map((item, index) => (
              <AchieveCard key={index} achievement={item} />
            ))}
          </div>
        </div>

        {/* Avatars Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-700">AVATARS</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6">
            {avatars.map((avatar, index) => (
              <div key={index} 
                className="flex flex-col items-center relative cursor-pointer hover:scale-105 transition-transform duration-200" 
                onClick={() => handleAvatarClick(avatar.name, avatar.unlocked)}>
                
                <div className={`w-32 h-32 rounded-full overflow-hidden border-4 
                  ${avatar.unlocked ? "border-purple-400 hover:border-purple-600" : "border-gray-400"} 
                  transition-colors relative`}>
                  
                  <Image
                    src={avatar.image}
                    alt={avatar.name}
                    width={128}
                    height={128}
                    className={`object-cover ${!avatar.unlocked ? "opacity-50" : ""}`}
                  />
                  
                  {!avatar.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                      <span className="text-white text-sm font-semibold">LOCKED</span>
                    </div>
                  )}
                </div>

                <span className={`mt-3 text-lg font-medium text-center 
                  ${avatar.unlocked ? "text-gray-800" : "text-gray-400"}`}>
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