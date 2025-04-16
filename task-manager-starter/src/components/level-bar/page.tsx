"use client";
import { getLevelFromXP, levelXP } from "@/lib/levels";
import { useEffect, useState } from "react";

export default function Levelbar() {
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
        <div className="flex flex-col items-start bg-white rounded-xl shadow-md p-3 space-y-1 w-full mb-2">
            <div className="text-sm font-bold text-black-700 tracking-wide">
                LEVEL {level}
            </div>
            <div className="relative w-full h-3 rounded-full overflow-hidden bg-gray-200 shadow-inner">
                <div className="absolute top-0 left-0 h-full w-full bg-red-100" />
                <div
                    className="absolute top-0 left-0 h-full bg-yellow-400 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="text-xs font-medium text-gray-600 w-full text-right">
                ✨ {xp - levelXp} XP / {nextLevelXp - levelXp} XP
            </div>
        </div>
    );
}