"use client";

import Sidebar from "@/components/sidebar/page";
import UserCard from "@/components/user-card/page";

export default function Profile() {

  return (
    <div className="flex min-h-screen bg-slate-400 text-gray-800">
      <Sidebar />
      <main className="flex flex-1 items-center justify-center">
        <div className="w-3/4 h-1/2"><UserCard /></div>
      </main>
    </div>
  );
}
