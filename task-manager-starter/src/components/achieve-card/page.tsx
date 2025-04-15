"use client";
import { Card, CardBody } from "@heroui/react";

type Achievement = {
  id: string;
  title: string;
  icon: string;
  description: string;
  userEmail: string;
};

type AchieveItemProps = {
  achievement: Achievement;
  onToggle?: (id: string) => void;
};

export function AchieveCard({ achievement, onToggle }: AchieveItemProps) {
  if (!achievement.id) return null;

  return (
    <div className="flex justify-center mt-2">
      <Card className="bg-yellow-100 flex-1 flex-shrink-0">
        <CardBody className="flex gap-2 items-center text-center">
            <h3 className="text-2xl font-semibold">{achievement.icon}</h3>
            <h3 className="text-xl font-semibold">{achievement.title}</h3>
            <p className="text-gray-600 text-sm">{achievement.description}</p>
        </CardBody>
      </Card>
    </div>
  );
}