// components/Sidebar.jsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-slate-200 p-4 flex flex-col gap-4">
      <Link href="/" className="px-2 py-2 hover:bg-slate-300 rounded">DASHBOARD</Link>
      <Link href="/tasks" className="px-2 py-2 hover:bg-slate-300 rounded">TASKS</Link>
      <Link href="/leaderboard" className="px-2 py-2 hover:bg-slate-300 rounded">LEADERBOARD</Link>
      <Link href="/achievements" className="px-2 py-2 hover:bg-slate-300 rounded">ACHIEVEMENTS</Link>
      <Link href="/profile" className="px-2 py-2 hover:bg-slate-300 rounded">PROFILE</Link>
    </aside>
  );
}