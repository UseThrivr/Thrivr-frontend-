import { cn } from "@/lib/utils"
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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-[90%] lg:w-[var(--dashboard-sidebar-width)] bg-white transform transition-transform duration-300 ease-in-out",
      "lg:relative lg:transform-none",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
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
                      className="mt-[var(--distance)] mb-9"
                      style={{
                          // @ts-expect-error ...
                          "--distance": "25px"
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
      </Sidebarx>
      
      {/* Mobile close overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      />
    </div>
  )
}

export default Sidebar;