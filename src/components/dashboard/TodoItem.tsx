// components/TodoItem.tsx
import React from "react";
import { Task } from "@/data/taskData";
import clsx from "clsx";

interface TodoItemProps {
    task: Task;
}

const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
    return (
        <div className="flex items-center justify-between py-4">
            {/* Icon and Task Details */}
            <div className="flex items-start gap-4">
                <span className="text-2xl">{task.icon}</span>
                <div>
                    <h3 className="font-semibold">{task.task}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                </div>
            </div>

            {/* Time */}
            <div className="text-gray-500">{task.time}</div>

            {/* Status */}
            <div
                className={clsx(
                    "text-sm font-semibold",
                    task.status === "Pending" && "text-red-500",
                    task.status === "Completed" && "text-green-500",
                    task.status === "Missed" && "text-red-500"
                )}
            >
                {task.status}
            </div>
        </div>
    );
};

export default TodoItem;
