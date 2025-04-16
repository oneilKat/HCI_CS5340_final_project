"use client";

import { useState, useEffect, JSX } from "react";
import Sidebar from "@/components/sidebar/page";
import Levelbar from "@/components/level-bar/page";
import Confetti from "react-confetti";
import { TaskCard } from "@/components/task-card/page";
import { AchieveCard } from "@/components/achieve-card/page";
import { Avatar } from "@heroui/react";
import { getAvatarFromName } from "@/lib/avatars";
import MotivationalMeme from "@/components/memes/page";
import MotivationalQuote from "@/components/motivational-quote/page";
import { ListChecks, Clock, AlertCircle, CheckCircle } from "lucide-react";

const getRandomColors = () => {
  const colorPalettes = [
    ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    ["#FFB6C1", "#98FB98", "#87CEEB", "#DDA0DD"],
    ["#9333EA", "#A855F7", "#C084FC", "#E9D5FF"],
    ["#FF7F50", "#8A2BE2", "#00FA9A", "#FF1493"],
    ["#FFA07A", "#98FB98", "#87CEFA", "#DDA0DD"],
  ];
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
};

const today = new Date().toISOString().split("T")[0];

type Task = {
  id: string;
  title: string;
  dueDate: string;
  status: boolean;
  previousDueDate?: string;
  priority: number;
  xp: number;
};

type Achievement = {
  id: string;
  title: string;
  icon: string;
  description: string;
  userEmail: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  avatar: string;
  level: number;
  role: string;
  xp: number;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [levelbarKey, setLevelBarKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiColors, setConfettiColors] = useState(getRandomColors());
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const avatar = getAvatarFromName(user?.avatar);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        const sorted = data.sort((a: Task, b: Task) => {
          if (a.status !== b.status) return a.status ? 1 : -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        setTasks(sorted);
      } catch (error) {
        console.log("Failed to fetch tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("/api/achievements");
        const data = await res.json();
        setAchievements(data);
      } catch (error) {
        console.error("Failed to fetch achievements", error);
      }
    };

    fetchAchievements();
  }, []);

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

  const refreshLevelBar = () => setLevelBarKey(prev => prev + 1);

  const handleToggle = async (id: string, completed: boolean, xp: number) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: !completed }),
      });

      if (!res.ok) throw new Error("Failed to update task");

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
          body: JSON.stringify({ xp }),
        });
      }

      const toggledTask = tasks.find((t) => t.id === id);
      if (toggledTask && !toggledTask.status) {
        setShowConfetti(true);
        setConfettiColors(getRandomColors());
        setTimeout(() => setShowConfetti(false), 3000);
      }

      refreshLevelBar();
    } catch (error) {
      console.error(error);
    }
  };

  const renderSection = (title: string, filterFn: (task: Task) => boolean) => {
    const icons: Record<string, JSX.Element> = {
      "TODAY'S TASKS": <Clock className="inline ml-2 text-blue-600" size={24} />,
      "FUTURE TASKS": <ListChecks className="inline ml-2 text-purple-600" size={24} />,
      "PAST DUE TASKS": <AlertCircle className="inline ml-2 text-red-600" size={24} />,
      "COMPLETED TASKS": <CheckCircle className="inline ml-2 text-green-600" size={24} />,
    };

    return (
      <div className="flex gap-6">
        <div className="flex-1">
          <h2 className="text-2xl text-center font-semibold mb-2 flex items-center justify-center gap-2">
            {title} {icons[title]}
          </h2>
          <div className="flex flex-col gap-3">
            {tasks
              .filter(filterFn)
              .sort((a, b) => a.priority - b.priority)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => handleToggle(task.id, task.status, task.xp)}
                />
              ))}
          </div>
        </div>
      </div>
    );
  };

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

      <main className="flex-[0.65] p-6 flex flex-col gap-6 mt-3">
        <Levelbar key={levelbarKey} />
        {renderSection("TODAY'S TASKS", (task) => task.dueDate === today && !task.status)}
        {renderSection("FUTURE TASKS", (task) => task.dueDate > today && !task.status)}
        {renderSection("PAST DUE TASKS", (task) => task.dueDate < today && !task.status)}
        {renderSection("COMPLETED TASKS", (task) => task.status)}
      </main>

      {/* Right Section with Avatar and Achievements */}
      <div className="flex flex-col flex-[0.35] p-4 gap-6 mt-3 mr-3">
        {/* Avatar Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center space-y-2">
          <Avatar 
            src={avatar} 
            alt="Wizard Avatar" 
            className="h-48 w-48 rounded-full border-4 border-black-700"/>
          <p className="text-3xl font-bold text-black-700 tracking-wide">{user?.name}</p>
          <p className="text-xl font-semibold text-blue-800 uppercase">{user?.role}</p>
          <p className="text-xl font-semibold text-red-800">Total XP: {user?.xp}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <MotivationalQuote />
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-2xl font-semibold mb-3 text-center">Achievements</h2>
          <div className="flex flex-col gap-3">
            {achievements.map((item, index) => (
              <AchieveCard key={index} achievement={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}