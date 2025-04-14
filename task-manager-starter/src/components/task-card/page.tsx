import { Card, CardBody } from "@heroui/react";

type Task = {
    id: string,
    title: string,
    completed: string,
    xp: number,
    dueDate: string,
}

type TaskItemProps = {
    task: Task;
}

export function TaskCard({task}: TaskItemProps) {
    return (<Card key={task.id}>
      <CardBody className="flex justify-between p-4">
          <span className={task.completed ? "text-gray-400 line-through" : ""}>
            {task.title}
          </span>
        <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
        <span className="text-lg text-blue-500">{task.xp} XP</span>
      </CardBody>
    </Card>);
};