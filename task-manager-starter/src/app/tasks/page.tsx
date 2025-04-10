"use client";

import Sidebar from "@/components/sidebar/page";
import { Card, CardBody } from "@heroui/react";
import { Progress } from "@heroui/react";

const tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"];

export default function TasksPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
        <Sidebar />
    {/* Main Content */}
    <main className="flex-1 p-6 flex flex-col gap-6">
        {/* Today's Tasks*/}
        <div className="flex gap-6">
          {/* Tasks */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">TODAY’S TASKS</h2>
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <Card key={index}>
                  <CardBody className="flex justify-between p-4">
                    <span>⬜ {task}</span>
                    <span className="text-sm text-gray-500">DUE: </span>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
         {/* Future Tasks*/}
         <div className="flex gap-6">
          {/* Tasks */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">FUTURE TASKS</h2>
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <Card key={index}>
                  <CardBody className="flex justify-between p-4">
                    <span>⬜ {task}</span>
                    <span className="text-sm text-gray-500">DUE: </span>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
         {/* Past Tasks*/}
         <div className="flex gap-6">
          {/* Tasks */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">PAST TASKS</h2>
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <Card key={index}>
                  <CardBody className="flex justify-between p-4">
                    <span>⬜ {task}</span>
                    <span className="text-sm text-gray-500">DUE: </span>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
  </div>
  );
}