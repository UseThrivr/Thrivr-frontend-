
export interface campaignData {
    name: string;
    title: string;
    startDate: Date;
    endDate: Date;
    audience: string;
    ongoing: boolean
}

export const campaigns: campaignData[] = [
    {
        name: "Facebook",
        title: "New Phone Launch Promo",
        startDate: new Date(2024, 10, 14),
        endDate: new Date(2024, 11, 14),
        audience: "Facebook",
        ongoing: true,
    },
    {
        name: "Instagram",
        title: "Summer Discount",
        startDate: new Date(2024, 10, 14),
        endDate: new Date(2024, 11, 14),
        audience: "Existing Customers",
        ongoing: true,
    },
    {
        name: "Instagram",
        title: "November Black Friday",
        startDate: new Date(2024, 10, 14),
        endDate: new Date(2024, 11, 14),
        audience: "Fashion Lovers",
        ongoing: false,
    },
    {
        name: "Email",
        title: "Promo",
        startDate: new Date(2024, 10, 14),
        endDate: new Date(2024, 11, 14),
        audience: "Discount Babies",
        ongoing: false,
    },
    {
        name: "Facebook",
        title: "Mid Year Discount",
        startDate: new Date(2024, 10, 14),
        endDate: new Date(2024, 11, 14),
        audience: "Tech Enthusiats",
        ongoing: false,
    },
]