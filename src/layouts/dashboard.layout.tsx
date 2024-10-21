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
                <div className="w-full">
                    <Navbar {...navBarProps} />
                    <div className="mt-[16.5vh] w-full">
                        <Outlet />
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}

export default DashboardLayout