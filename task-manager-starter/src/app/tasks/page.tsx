"use client";

import { useState, useEffect } from 'react';
import Sidebar from "@/components/sidebar/page";
import { Card, CardBody } from "@heroui/react";
import { Progress } from "@heroui/react";
import Confetti from 'react-confetti';

const tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"];

export default function TasksPage() {
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTask = (taskId: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
    
    // Only show confetti when checking a task (not unchecking)
    if (!checkedTasks[taskId]) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const TaskCheckbox = ({ task, index, section }: { task: string; index: number; section: string }) => (
    <Card key={index}>
      <CardBody className="flex justify-between p-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleTask(`${section}-${task}-${index}`)}
            className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center hover:border-purple-500 transition-colors"
            aria-label={`Complete ${task}`}
            role="checkbox"
            aria-checked={checkedTasks[`${section}-${task}-${index}`] || false}
          >
            {checkedTasks[`${section}-${task}-${index}`] ? '✓' : ''}
          </button>
          <span 
            id={`task-${section}-${index}`}
            className={checkedTasks[`${section}-${task}-${index}`] ? 'line-through text-gray-400' : ''}
          >
            {task}
          </span>
        </div>
        <span className="text-sm text-gray-500">DUE: </span>
      </CardBody>
    </Card>
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
          colors={['#9333EA', '#A855F7', '#C084FC', '#E9D5FF']}
        />
      )}
      <Sidebar />
      <main className="flex-1 p-6 flex flex-col gap-6">
        {/* Today's Tasks*/}
        <div className="flex gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">TODAY'S TASKS</h2>
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <TaskCheckbox 
                  key={`today-${index}`} 
                  task={task} 
                  index={index} 
                  section="today" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Future Tasks*/}
        <div className="flex gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">FUTURE TASKS</h2>
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <TaskCheckbox 
                  key={`future-${index}`} 
                  task={task} 
                  index={index} 
                  section="future" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Past Tasks*/}
        <div className="flex gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">PAST TASKS</h2>
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <TaskCheckbox 
                  key={`past-${index}`} 
                  task={task} 
                  index={index} 
                  section="past" 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}