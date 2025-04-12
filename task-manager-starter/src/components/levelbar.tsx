"use client";
import { Progress } from "@heroui/react";

export default function Levelbar() {
  return (
    <div className="flex justify-between items-center">
        <div className="w-1/2">
            <div className="text-sm font-semibold">LEVEL 1</div>
            <Progress value={90} className="w-full mt-1" />
            <div className="text-xs mt-1 text-right text-gray-600">450 XP / 500 XP</div>
        </div>
    </div>
  );
}
