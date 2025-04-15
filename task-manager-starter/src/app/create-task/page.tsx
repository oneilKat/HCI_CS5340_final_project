"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreateTaskPage() {
    const router = useRouter();

    const [managerEmail, setManagerEmail] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user");
                const data = await res.json();
                setManagerEmail(data.email);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        fetchUser();
    }, []);

    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [priority, setPriority] = useState(3);
    const [xp, setXp] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                dueDate,
                managerEmail,
                employeeEmail,
                priority,
                xp
            })
        });

        if (res.ok) {
            router.push("/");
        } else {
            console.error("Failed to create task");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Assign to (email)"
          value={employeeEmail}
          onChange={(e) => setEmployeeEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Priority (1-5)"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          min={1}
          max={5}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="XP Value"
          value={xp}
          onChange={(e) => setXp(Number(e.target.value))}
          min={0}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Create Task
        </button>
      </form>
    </div>
    );
}