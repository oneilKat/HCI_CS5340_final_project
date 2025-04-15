"use client";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
  dueDate: string;
  priority: number;
};

type TaskItemProps = {
  task: Task;
  onToggle?: (id: string) => void;
};

export function TaskCard({ task, onToggle }: TaskItemProps) {
  const handleToggle = () => {
    if (onToggle) {
      onToggle(task.id);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2">
        {onToggle && (
          <button
            onClick={handleToggle}
            className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center hover:border-purple-500 transition-colors"
            aria-label={`Toggle task ${task.title}`}
            role="checkbox"
            aria-checked={task.completed}
          >
            {task.completed ? "✓" : ""}
          </button>
        )}
        <div className="flex flex-col">
          <span
            className={
              task.completed
                ? "text-xl text-black line-through text-gray-400"
                : "text-xl text-black"
            }
          >
            {task.title}
          </span>
          <span className="text-sm text-red-800">Due: {task.dueDate}</span>
        </div>
      </div>
      <div className="flex flex-col items-end text-right">
        <span className="text-sm text-gray-500">Priority: {task.priority}</span>
        <span className="text-md text-red-400">{task.xp} XP</span>
      </div>
    </div>
  );
}