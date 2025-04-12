"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/page";
import { Card, CardBody } from "@heroui/react";
import Confetti from "react-confetti";
import Levelbar from "@/components/levelbar";

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
  { id: "1", title: "Task 1", dueDate: "2025-04-10", completed: false, priority: 2, xp: 50 },
  { id: "2", title: "Task 2", dueDate: "2025-04-10", completed: false, priority: 1, xp: 30 },
  { id: "3", title: "Task 3", dueDate: "2025-04-11", completed: false, priority: 3, xp: 70 },
  { id: "4", title: "Task 4", dueDate: "2025-04-12", completed: false, priority: 2, xp: 40 },
  { id: "5", title: "Task 5", dueDate: "2025-04-09", completed: false, priority: 3, xp: 60 },
  { id: "6", title: "Task 6", dueDate: "2025-04-11", completed: false, priority: 2, xp: 35 },
  { id: "7", title: "Task 7", dueDate: "2025-04-11", completed: false, priority: 1, xp: 20 },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showConfetti, setShowConfetti] = useState(false);
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

    const toggledTask = tasks.find((t) => t.id === id);
    if (toggledTask && !toggledTask.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const TaskCheckbox = ({ task }: { task: Task }) => (
    <Card key={task.id}>
      <CardBody className="flex justify-between p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleTask(task.id)}
            className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center hover:border-purple-500 transition-colors"
            aria-label={`Complete ${task.title}`}
            role="checkbox"
            aria-checked={task.completed}
          >
            {task.completed ? "✓" : ""}
          </button>
          <span className={task.completed ? "line-through text-gray-400" : ""}>
            {task.title}
          </span>
        </div>
        <span className="text-sm text-red-500">Priority: {task.priority}</span>
        <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
        <span className="text-lg text-blue-500">{task.xp} XP</span>
      </CardBody>
    </Card>
  );

  const renderSection = (title: string, filterFn: (task: Task) => boolean) => (
    <div className="flex gap-6">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex flex-col gap-3">
          {tasks
            .filter(filterFn)
            .sort((a, b) => a.priority - b.priority)
            .map((task) => (
              <TaskCheckbox key={task.id} task={task} />
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
          colors={["#9333EA", "#A855F7", "#C084FC", "#E9D5FF"]}
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