// pages/TodoPage.tsx
import React, { useState } from "react";
import { H1, H4, P } from "@/components/global";
import { tasksData } from "@/data/taskData";
import TodoItem from "@/components/dashboard/TodoItem";
import { formatDateToTodayYesterday } from "@/utils/formatDate";
import { NotebookPen } from "lucide-react";
import TodoPopup from "@/components/dashboard/TodoPopup";

const Todo: React.FC = () => {
    // Group tasks by date
    const groupedTasks = tasksData.reduce<Record<string, typeof tasksData>>((acc, task) => {
        const formattedDate = formatDateToTodayYesterday(task.date);
        if (!acc[formattedDate]) acc[formattedDate] = [];
        acc[formattedDate].push(task);
        return acc;
    }, {});

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div className="">
            <div className="flex flex-col items-start gap-[4px]">
                <H1 className="hidden md:flex">Things to do</H1>
                <P>Let's get your store ready for success</P>
            </div>
            <div className="mt-[54px] mb-9 flex justify-end items-center gap-[246px]">
                <div className="flex items-center gap-[16px] h-[46px]">
                    <button onClick={openPopup} className="hidden lg:flex justify-center items-center py-[8px] px-[16px] gap-[16px] h-[46px] bg-action-default rounded-[24px] text-white">
                        <NotebookPen />
                        <span className="font-medium text-[20px] leading-[30px]">Create plan</span>
                    </button>
                    <a href="/todo/create-plan" className="flex lg:hidden justify-center items-center py-[8px] px-[16px] gap-[16px] h-[46px] bg-action-default rounded-[24px] text-white">
                        <NotebookPen />
                        <span className="font-medium text-[20px] leading-[30px]">Create plan</span>
                    </a>
                </div>
            </div>
            <div className="border border-[#CDCED3] p-[1rem] flex flex-col gap-[38px] rounded-[8px]">
                {Object.keys(groupedTasks).map((date, index) => (
                    <React.Fragment key={date}>
                        {index > 0 && <hr className="border-[#CDCED3]" />}
                        <div className="flex flex-col gap-[38px]">
                            <H4>{date}</H4>
                            <div className="bg-white rounded">
                                {groupedTasks[date].map((task, idx) => (
                                    <React.Fragment key={task.id}>
                                        <TodoItem task={task} />
                                        {idx !== groupedTasks[date].length - 1 && (
                                            <hr className="my-4 border-[#CDCED3]" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <TodoPopup isOpen={isPopupOpen} onClose={closePopup} />
        </div>
    );
};

export default Todo