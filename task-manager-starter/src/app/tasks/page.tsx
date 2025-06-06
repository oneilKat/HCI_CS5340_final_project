"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/page";
import Levelbar from "@/components/level-bar/page";
import Confetti from "react-confetti";
import { TaskCard } from "@/components/task-card/page";

const getRandomColors = () => {
  const colorPalettes = [
    ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    ['#FFB6C1', '#98FB98', '#87CEEB', '#DDA0DD'],
    ['#9333EA', '#A855F7', '#C084FC', '#E9D5FF'],
    ['#FF7F50', '#8A2BE2', '#00FA9A', '#FF1493'],
    ['#FFA07A', '#98FB98', '#87CEFA', '#DDA0DD'],
  ];
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
};

const today = new Date().toISOString().split("T")[0];

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  previousDueDate?: string;
  priority: number;
  xp: number;
};

const initialTasks: Task[] = [
  { id: "1", title: "Task 1", dueDate: today, completed: false, priority: 2, xp: 50 },
  { id: "2", title: "Task 2", dueDate: today, completed: false, priority: 1, xp: 30 },
  { id: "3", title: "Task 3", dueDate: today, completed: false, priority: 3, xp: 70 },
  { id: "4", title: "Task 4", dueDate: today, completed: false, priority: 2, xp: 40 },
  { id: "5", title: "Task 5", dueDate: "2025-04-09", completed: false, priority: 3, xp: 60 },
  { id: "6", title: "Task 6", dueDate: "2025-04-11", completed: false, priority: 2, xp: 35 },
  { id: "7", title: "Task 7", dueDate: "2025-04-11", completed: false, priority: 1, xp: 20 },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiColors, setConfettiColors] = useState(getRandomColors());
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTask = (id: string) => {
    const toggledTask = tasks.find((t) => t.id === id);
    if (toggledTask && !toggledTask.completed) {
      setShowConfetti(true);
      setConfettiColors(getRandomColors());
      setTimeout(() => setShowConfetti(false), 3000);
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== id) return task;

        if (!task.completed) {
          return {
            ...task,
            completed: true,
            previousDueDate: task.dueDate,
            dueDate: today,
          };
        } else {
          return {
            ...task,
            completed: false,
            dueDate: task.previousDueDate || today,
            previousDueDate: undefined,
          };
        }
      })
    );
  };

  const renderSection = (title: string, filterFn: (task: Task) => boolean) => (
    <div className="flex gap-6">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <div className="flex flex-col gap-3">
          {tasks
            .filter(filterFn)
            .sort((a, b) => a.priority - b.priority)
            .map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} />
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={confettiColors}
        />
      )}
      <Sidebar />
      <main className="flex-1 p-6 flex flex-col gap-6">
        <Levelbar />
        {renderSection("TODAY'S TASKS", (task) => task.dueDate === today && !task.completed)}
        {renderSection("FUTURE TASKS", (task) => task.dueDate > today && !task.completed)}
        {renderSection("PAST DUE TASKS", (task) => task.dueDate < today && !task.completed)}
        {renderSection("COMPLETED TASKS", (task) => task.completed)}
      </main>
    </div>
  );
}