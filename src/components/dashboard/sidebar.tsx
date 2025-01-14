import { cn } from "@/lib/utils";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { ThrivrHeader } from "../svg";
import userImage from "@/assets/user-img.png";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as Sidebarx,
} from "../ui/sidebar";
import { ChevronDown, LogOut, Store } from "lucide-react";
import { sidebarLinks, sideBarMore } from "@/constants";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleOverlayClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  const handleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  const { logout, user } = useAuth();

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[var(--dashboard-sidebar-width)] bg-white transform transition-transform duration-300 ease-in-out",
          "lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Sidebarx
          collapsible="none"
          className="bg-neutral-alt border-r border-solid border-neutral-border gap-[40px] fixed"
        >
          <SidebarHeader className="pl-[2rem] mt-[40px]">
            <ThrivrHeader />
          </SidebarHeader>

          <SidebarContent className="overflow-auto lg:overflow-hidden lg:hover:overflow-auto">
            <SidebarGroup className="pr-0">
              <SidebarGroupLabel className="text-[16px] p-0 leading-22 text-text-secondary pl-[2rem]">
                MENU
              </SidebarGroupLabel>
              <SidebarGroupContent
                className="mt-[var(--distance)] mb-9"
                style={{
                  // @ts-expect-error ...
                  "--distance": "25px",
                }}
              >
                <SidebarMenu className="gap-[var(--distance)]">
                  {sidebarLinks.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="sidebar-link pl-[2rem]"
                      >
                        <NavLink to={item.url} onClick={onClose}>
                          <span className={clsx()}>
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
            <div className="p-2 flex lg:hidden flex-col">
              <div className="flex-col flex items-start pl-[2rem] py-3 w-full gap-6">
                <button
                  onClick={handleAccordion}
                  className="flex w-[208px] text-action-default font-medium text-xl justify-between"
                >
                  {accordionOpen ? "Minimize" : "More"}{" "}
                  <ChevronDown
                    className={`${
                      accordionOpen && "rotate-180"
                    } transition-all duration-300`}
                    size={24}
                  />
                </button>
                <div
                  className={`${
                    accordionOpen ? "flex" : "hidden"
                  } flex-col gap-6`}
                >
                  {sideBarMore.map((item, i) => (
                    <button
                      key={i}
                      className="flex gap-2 text-text-secondary font-medium text-xl"
                    >
                      <item.icon size={24} />
                      {item.name}
                    </button>
                  ))}
                  <button className="p-4 flex gap-2 text-white font-normal text-xl bg-action-default rounded-2xl">
                    <Store />
                    My Thrivr store
                  </button>
                </div>
                <a href="/profile" className="flex gap-4 items-center">
                  <div
                    className="box-border size-[48px] border border-solid border-text-secondary rounded-[24px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${user?.image_path || userImage})`,
                    }}
                  />
                  <div className="flex flex-col items-start gap-[2px]">
                    <p className="font-medium text-base text-text-secondary">
                      {user?.full_name}
                    </p>
                    <p className="font-medium text-xs text-text-secondary">
                      {user?.role}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="pl-[2rem] cursor-pointer"
                    >
                      <button onClick={logout} className="flex rounded-none justify-start items-center gap-[37px] h-[48px] hover:!text-action-hover hover:!border-r-action-hover border-r-[4px] hover:border-solid border-transparent text-text-secondary">
                        <span className="font-medium text-[20px] leading-22 flex flex-row items-center p-0 gap-[16px] h-[24px]">
                          <LogOut />
                          Log Out
                        </span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebarx>
      </div>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-70 z-20 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={handleOverlayClick}
      ></div>
    </>
  );
};

export default Sidebar;
