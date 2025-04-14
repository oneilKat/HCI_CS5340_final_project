"use client";
import { Progress } from "@heroui/react";

export default function Levelbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="w-full">
        <div className="text-md font-semibold">LEVEL 1</div>
        <Progress value={90} className="w-full mt-1 [&>div]:bg-red-300" />
        <div className="text-md mt-1 text-right text-red-600">450 XP / 500 XP</div>
      </div>
    </div>
  );
}