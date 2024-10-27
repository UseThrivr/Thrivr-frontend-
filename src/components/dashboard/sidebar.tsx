import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import { ThrivrHeader } from "../svg";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    Sidebar as Sidebarx
} from "../ui/sidebar";
import { LogOut } from "lucide-react";
import { sidebarLinks } from "@/constants";


const Sidebar = () => {
    return (
        <Sidebarx
            collapsible="none"
            className="bg-neutral-alt border-r border-solid border-neutral-border gap-[40px] fixed"
        >
            <SidebarHeader className="pl-[2rem] mt-[40px]">
                <ThrivrHeader />
            </SidebarHeader>

            <SidebarContent className="overflow-visible pl-[2rem]">
                <SidebarGroup className="pr-0">
                    <SidebarGroupLabel className="text-[16px] p-0 leading-22 text-text-secondary">
                        MENU
                    </SidebarGroupLabel>
                    <SidebarGroupContent
                        className="mt-[var(--distance)]"
                        style={{
                            // @ts-expect-error ...
                            "--distance": "10px"
                        }}
                    >
                        <SidebarMenu className="gap-[var(--distance)]">
                            {sidebarLinks.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="sidebar-link">
                                        <NavLink to={item.url}>
                                            <span className={clsx(

                                            )}>
                                                <item.icon size={24} />
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="sidebar-link">
                                    <Link to="#">
                                        <span>
                                            <LogOut />
                                            Log Out
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebarx >
    )
}

export default Sidebar;