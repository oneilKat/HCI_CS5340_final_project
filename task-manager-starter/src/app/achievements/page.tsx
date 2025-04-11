"use client";
import { getAvatars } from '@/utils/getAvatars'

import Sidebar from "@/components/sidebar/page";
import { Card, CardBody } from "@heroui/react";
import { Progress } from "@heroui/react";
import Image from "next/image";

const achievements = ["Badge 1", "Badge 2", "Badge 3", "Badge 4", "Badge 5"];
const avatars = getAvatars();

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

        {/* Avatars Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Avatars</h2>
          <div className="grid grid-cols-5 gap-6">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-400 hover:border-purple-600 transition-colors">
                  <Image
                    src={avatar.image}
                    alt={avatar.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-center">{avatar.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
  </div>
  );
}