// pages/TodoPage.tsx
import React from "react";
import { tasksData } from "@/data/taskData";
import TodoItem from "@/components/dashboard/TodoItem";
import { formatDateToTodayYesterday } from "@/utils/formatDate";

const Todo: React.FC = () => {
    // Group tasks by date
    const groupedTasks = tasksData.reduce((acc, task) => {
        const formattedDate = formatDateToTodayYesterday(task.date);
        if (!acc[formattedDate]) acc[formattedDate] = [];
        acc[formattedDate].push(task);
        return acc;
    }, {} as Record<string, Task[]>);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Things to do</h1>
            <p className="text-gray-500 mb-8">Let’s get your store ready for success</p>

            <button className="bg-purple-600 text-white py-2 px-4 rounded mb-6">
                Create plan
            </button>

            {Object.keys(groupedTasks).map((date) => (
                <div key={date}>
                    <h2 className="text-lg font-semibold mb-2">{date}</h2>
                    <div className="bg-white shadow-md rounded p-4 mb-4">
                        {groupedTasks[date].map((task) => (
                            <React.Fragment key={task.id}>
                                <TodoItem task={task} />
                                <hr className="my-4 border-gray-200" />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default Todo