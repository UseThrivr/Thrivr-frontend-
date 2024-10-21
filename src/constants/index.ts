import {
    BadgeDollarSign,
    LayoutDashboard,
    Link as LinkIcon,
    Megaphone,
    NotebookPen,
    PackageOpen,
    PiggyBank,
    ShoppingBag,
    Users,
    Box,
    type LucideProps
} from "lucide-react";



export const overviewData: Array<{
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    name: string;
    amount: number;
    percentage: string;
    color: string;
}> = [
    {
        icon: LayoutDashboard, 
        name: "Total Inventory",
        amount: 4000,
        percentage: "+65%",
        color: "bg-green-500" 
    },
    {
        icon: Box, 
        name: "Product Sold",
        amount: 3000,
        percentage: "+65%",
        color: "bg-blue-500" 
    },
    {
        icon: ShoppingBag, 
        name: "Orders",
        amount: 500,
        percentage: "-15%",
        color: "bg-red-500"
    },
    {
        icon: Users,
        name: "New Customers",
        amount: 65,
        percentage: "+23%",
        color: "bg-yellow-500"
    }
];


export const sidebarLinks: Array<{
    url: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    title: string;
}> = [
        {
            url: "/dashboard",
            title: "Dashboard",
            icon: LayoutDashboard
        },
        {
            url: "/sales",
            title: "Sales",
            icon: BadgeDollarSign
        },
        {
            url: "/inventory",
            title: "Products",
            icon: PackageOpen
        },
        {
            url: "/orders",
            title: "Orders",
            icon: ShoppingBag
        },
        {
            url: "/customers",
            title: "Customers",
            icon: Users
        },
        {
            url: "/todo",
            title: "To Do",
            icon: NotebookPen
        },
        {
            url: "/mybank",
            title: "My Bank",
            icon: PiggyBank
        },
        {
            url: "/integration",
            title: "Integration",
            icon: LinkIcon
        },
        {
            url: "/ads",
            title: "Ads",
            icon: Megaphone
        }
    ]

export const METADATA: Metadata = {
    title: "Thrivr",
    description: "Thrivr helps creators grow their businesses with easy storefront setup, dynamic product management, and integrated growth analytics.",
    image: "/favicon.png",
    url: location.origin,
    author: "Thrivr Dev Team",
    type: "website",
    publisher: "Thrivr Inc",
    publishedAt: "",
    keywords: "creator business growth, storefront setup for creators, dynamic product management, business analytics for creators, grow your creator brand, creator tools for business success, online storefront for creators, Thrivr platform for creators, creator business solutions, integrated analytics for creators"
}