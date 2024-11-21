import { useState } from "react"
import { cn } from "@/lib/utils"
import { Navbar, Sidebar } from "@/components/dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet, ScrollRestoration } from "react-router-dom"

const DashboardLayout: React.FC<NavBarProps> = (navBarProps) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    return (
        <>
            <ScrollRestoration />
            <SidebarProvider
                open
                style={{ "--sidebar-width": "var(--dashboard-sidebar-width)" } as React.CSSProperties}
            >
                <Sidebar 
                    className={cn(
                        "lg:block",
                        "fixed lg:static inset-y-0 left-0 z-50 w-[90%] lg:w-[var(--dashboard-sidebar-width)] bg-white transform transition-transform duration-300 ease-in-out",
                        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    )}
                    onClose={() => setIsMobileSidebarOpen(false)} isOpen={false}                />
                
                <div className="w-full lg:ml-auto lg:w-[calc(100%-var(--dashboard-sidebar-width))]">
                    <Navbar 
                        {...navBarProps} 
                        // onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
                    />
                    <div className="mt-[16.5vh] w-full">
                        <div className="w-full lg:w-[calc(100% - var(--dashboard-sidebar-width))]">
                            <Navbar {...navBarProps} />
                        </div>
                        <div className="w-full px-4 lg:px-0 overflow-x-hidden">
                            <Outlet />
                        </div>
                    </div>
                </div>

                {isMobileSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 lg:hidden z-40"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />
                )}
            </SidebarProvider>
        </>
    )
}
export default DashboardLayout
