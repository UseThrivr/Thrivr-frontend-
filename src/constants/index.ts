import {
    BadgeDollarSign,
    LayoutDashboard,
    Link as LinkIcon,
    Megaphone,
    Layers3,
    NotebookPen,
    PackageOpen,
    PiggyBank,
    ShoppingBag,
    Users,
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
        icon: Layers3, 
        name: "Total Inventory",
        amount: 4000,
        percentage: "+65%",
        color: "bg-[#fbf2fd]" 
    },
    {
        icon: PackageOpen, 
        name: "Product Sold",
        amount: 3000,
        percentage: "+65%",
        color: "bg-[#e7f7e8]" 
    },
    {
        icon: ShoppingBag, 
        name: "Orders",
        amount: 500,
        percentage: "-15%",
        color: "bg-[#eaecfd]"
    },
    {
        icon: Users,
        name: "New Customers",
        amount: 65,
        percentage: "+23%",
        color: "bg-[#fff9e6]"
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


 export const progressData = [
    { name: "Thrivr Store", percentage: 36 },
    { name: "Offline Sales", percentage: 20 },
    { name: "WhatsApp", percentage: 10 },
    { name: "Instagram", percentage: 6 },
    { name: "Facebook", percentage: 4 },
    { name: "Twitter", percentage: 1 },
    { name: "Affiliates", percentage: 1 },
 ];
      

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