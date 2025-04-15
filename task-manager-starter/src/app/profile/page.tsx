"use client";

import UserCard from "@/components/user-card/page";
import { TaskCard } from "@/components/task-card/page";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  status: boolean;
  xp: number;
  dueDate: string;
  priority: number;
};

export default function Profile() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleToggle = async (id: string, completed: boolean, xp: number) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: !completed })
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await res.json();

      setTasks(prev => 
        prev.map(task => (task.id === id ? { ...task, status: updatedTask.status } : task))
      );

      if (!completed) {
        await fetch("/api/user/xp", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ xp })
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();

        const sorted = data.sort((a: Task, b: Task) => {
          if (a.status !== b.status) {
            return a.status ? 1 : -1;
          }

          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });

        setTasks(sorted);
      } catch (error) {
        console.log("Failed to fetch tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <UserCard />
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={() => handleToggle(task.id, task.status, task.xp)}/>
        ))}
      </div>
    </div>
  );
}
