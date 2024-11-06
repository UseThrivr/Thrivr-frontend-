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
            <div className="flex items-start gap-4 w-[513px]">
                <div className={`w-[64px] h-[64px] flex items-center justify-center rounded-[8px] ${task.bg}`}>
                    <span className="text-2xl"><task.icon /></span>
                </div>
                <div>
                    <h3 className="font-semibold text-[#24272E] text-[24px] leading-[33.6px] tracking-[-2%]">{task.task}</h3>
                    <p className="text-[16px] font-[400] text-[#5C636D]">{task.description}</p>
                </div>
            </div>

            {/* Time - Added fixed width */}
            <div className="text-[#5C636D] font-medium text-[20px] flex items-center justify-center w-[100px] text-center">{task.time}</div>

            {/* Status */}
            <div
                className={clsx(
                    "font-medium text-[18px] pr-12",
                    task.status === "Pending" && "text-[#FF7A59]",
                    task.status === "Completed" && "text-[#28A745]",
                    task.status === "Missed" && "text-[#DC3545]"
                )}
            >
                {task.status}
            </div>
        </div>
    );
};

export default TodoItem;
