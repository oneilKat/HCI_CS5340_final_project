// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

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
    </aside>
  );
}