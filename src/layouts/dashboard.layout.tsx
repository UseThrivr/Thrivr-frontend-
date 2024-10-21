import { Navbar, Sidebar } from "@/components/dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet, ScrollRestoration } from "react-router-dom"

const DashboardLayout: React.FC<NavBarProps> = (navBarProps) => {
    return (
        <>
            <ScrollRestoration />
            <SidebarProvider
                open
                className="h-screen"
                // @ts-expect-error ...
                style={{ "--sidebar-width": "var(--dashboard-sidebar-width)" }}
            >
                <Sidebar />
                <div>
                    <Navbar {...navBarProps} />
                    <Outlet />
                </div>
            </SidebarProvider>
        </>
    )
}

export default DashboardLayout