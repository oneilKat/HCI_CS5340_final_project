import { Card, CardBody, Progress, User } from "@heroui/react";
import { getServerSession } from "next-auth";

import options from "@/config/auth";
import requireAuth from "@/utils/require-auth";
import { getLevelFromXP, levelXP } from "@/lib/levels";

export default async function Profile() {
  await requireAuth();
  const session = await getServerSession(options);

  // Level Logic
  const xp = session?.user?.xp || 0;
  const level = getLevelFromXP(xp);
  const levelXp = levelXP[level] || 0;
  const nextLevelXp = levelXP[level + 1] || 0;
  const progress = Math.floor(((xp - levelXp) / (nextLevelXp - levelXp)) * 100);

  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardBody>
        <User
          name={session?.user?.name}
          description={session?.user?.email}
          avatarProps={{
            showFallback: !session?.user?.image,
            src: session?.user?.image || "",
          }}
        />
        <div className="w-full">
          <div className="text-sm font-semibold">LEVEL {level}</div>
          <Progress value={progress} className="w-full mt-1" />
          <div className="text-xs mt-1 text-right text-gray-600">{xp - levelXp} XP / {nextLevelXp - levelXp} XP</div>
        </div>
      </CardBody>
    </Card>
  );
}
