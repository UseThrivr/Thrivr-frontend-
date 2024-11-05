import { Navbar, Sidebar } from "@/components/dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet, ScrollRestoration } from "react-router-dom"

const DashboardLayout: React.FC<NavBarProps> = (navBarProps) => {
    return (
        <>
            <ScrollRestoration />
            <SidebarProvider
                open
                // @ts-expect-error ...
                style={{ "--sidebar-width": "var(--dashboard-sidebar-width)" }}
            >
                <Sidebar />
                <div className="ml-auto w-[calc(100%-var(--dashboard-sidebar-width))]">
                    <Navbar {...navBarProps} />
                    <div className="mt-[16.5vh] w-full py-[50px]">
                        <div className="w-[calc(100% - var(--dashboard-sidebar-width))]">
                            <Navbar {...navBarProps} />
                        </div>
                        <div className="mt-[1vh] w-full">
                            <Outlet />
                        </div>
                </div>
                </div>
            </SidebarProvider>
        </>
    )
}

export default DashboardLayout