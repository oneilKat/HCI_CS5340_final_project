"use client";
import { getLevelFromXP, levelXP } from "@/lib/levels";
import { Progress } from "@heroui/react";
import { useEffect, useState } from "react";

export default function TestLevelbar() {
    const [xp, setXp] = useState<number>(0);

    useEffect(() => {
        const fetchXp = async () => {
            try {
                const res = await fetch("/api/user/xp");
                if (!res.ok) {
                    throw new Error("Failed to fetch XP");
                }
                const data = await res.json();
                setXp(data.xp);
            } catch (error) {
                console.error("Error fetching XP: ", error);
            }
        };

        fetchXp();
    }, []);

    const level = getLevelFromXP(xp);
      const levelXp = levelXP[level] || 0;
      const nextLevelXp = levelXP[level + 1] || 0;
      const progress = Math.floor(((xp - levelXp) / (nextLevelXp - levelXp)) * 100);
  return (
    <div className="flex justify-between items-center">
        <div className="w-full">
          <div className="text-sm font-semibold">LEVEL {level}</div>
          <Progress value={progress} className="w-full mt-1" />
          <div className="text-xs mt-1 text-right text-gray-600">{xp - levelXp} XP / {nextLevelXp - levelXp} XP</div>
        </div>
    </div>
  );
}
