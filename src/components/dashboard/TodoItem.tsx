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
            <div className="flex flex-col lg:flex-row items-start gap-4">
                <div className={`p-3 lg:p-5 flex items-center justify-center rounded-[8px] ${task.bg}`}>
                    <span className="text-2xl"><task.icon /></span>
                </div>
                <div>
                    <h3 className="font-semibold text-[#24272E] text-xl lg:text-[24px] leading-[33.6px] tracking-[-2%]">{task.task}</h3>
                    <p className="text-sm lg:text-[16px] font-[400] text-[#5C636D]">{task.description}</p>
                </div>
            </div>

            {/* Time - Added fixed width */}
            <div className="ms-5 text-[#5C636D] font-medium text-[20px] flex items-center justify-center text-center">{task.time}</div>

            {/* Status */}
            <div
                className={clsx(
                    "font-medium ms-3 lg:ms-0 text-sm lg:text-[18px] lg:pr-12",
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
