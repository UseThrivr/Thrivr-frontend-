import React from "react";
import { overviewData } from "@/constants";

const OverviewCard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
            {overviewData.map((item, index) => (
                <div
                    key={index}
                    className={`p-6 rounded-lg shadow-md flex opacity-1 items-center justify-between text-white ${item.color}`} // Dynamically set background color
                >
                    <div className="flex items-center">
                        {/* Properly render the icon */}
                        <item.icon className="w-10 h-10 mr-4" />
                        <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-xl font-bold">{item.amount}</p>
                        </div>
                    </div>
                    <p className={`text-lg font-semibold ${item.percentage.startsWith("-") ? "text-red-600" : "text-green-400"}`}>
                        {item.percentage}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default OverviewCard;
