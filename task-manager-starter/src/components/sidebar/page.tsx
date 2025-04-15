// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "../app-navbar/auth-button";

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setRole(data.role);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchRole();
  });

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/achievements", label: "Achievements" },
    { href: "/profile", label: "Profile" },
    { href: "/acc", label: "Account" },
  ];

  return (
    <aside className="w-60 min-h-screen bg-slate-200 p-4 flex flex-col gap-2 shadow-md">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-lg hover:bg-slate-300 transition 
          ${pathname === href ? "bg-slate-300 font-semibold" : ""}`}
        >
          {label}
        </Link>
      ))}
      {role === "manager" && <Link href="/create-task" className="flex items-center gap-2 px-3 py-2 rounded-md text-lg hover:bg-slate-300">Create Task</Link>}

      <div className="mt-auto flex justify-end pr-2">
        <AuthButton minimal={false}/>
      </div>

    </aside>
  );
}