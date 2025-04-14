"use client";

import { TaskCard } from "@/components/task-card/page";
import UserCard from "@/components/user-card/page";

export default function Profile() {

  return (
    <div>
      <UserCard />
      <TaskCard task={{ id: "8008", title: "Testing", completed: "", xp: 50, dueDate: "" }} />
    </div>
  );
}
