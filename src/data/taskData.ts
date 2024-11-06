export interface Task {
    id: number;
    icon: string;
    task: string;
    description: string;
    time: string; // In "HH:mm" format
    status: "Pending" | "Completed" | "Missed";
    date: Date; // Date to categorize by Today, Yesterday, etc.
}

export const tasksData: Task[] = [
    {
        id: 1,
        icon: "📦",
        task: "Send John’s order by 12 PM",
        description: "Ensure it ships on time to keep your delivery promise.",
        time: "12:00",
        status: "Pending",
        date: new Date(),
    },
    {
        id: 2,
        icon: "🛒",
        task: "You have 20 pending orders",
        description: "Review and process these orders to keep up with demand.",
        time: "07:00",
        status: "Completed",
        date: new Date(),
    },
    {
        id: 3,
        icon: "📧",
        task: "Follow up with Obi on his canceled order",
        description: "Send a courtesy email to understand why he canceled.",
        time: "06:00",
        status: "Completed",
        date: new Date(),
    },
    {
        id: 4,
        icon: "📱",
        task: "Restock iPhone 6",
        description: "Stock for iPhone 6 is running low—order new units by Friday.",
        time: "15:00",
        status: "Missed",
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
        id: 5,
        icon: "💬",
        task: "Reply to 5 new customer inquiries",
        description: "These customers have questions about their orders.",
        time: "07:00",
        status: "Completed",
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
];