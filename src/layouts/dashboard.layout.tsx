import { useState } from "react"
import { cn } from "@/lib/utils"
import { Navbar, Sidebar } from "@/components/dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const DashboardLayout: React.FC<NavBarProps> = (navBarProps) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    const handleMobileMenuClick = () => {
        setIsMobileSidebarOpen(true)
    }

    return (
        <>
            {/* <ScrollRestoration /> */}
            <SidebarProvider
                open
                style={{ "--sidebar-width": "var(--dashboard-sidebar-width)" } as React.CSSProperties}
            >
                <div className="flex h-screen overflow-hidden">
                    <Sidebar 
                        className={cn(
                            "fixed lg:relative inset-y-0 left-0 z-50 w-64 lg:w-[var(--dashboard-sidebar-width)] bg-white transform transition-transform duration-300 ease-in-out",
                            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        )}
                        onClose={() => setIsMobileSidebarOpen(false)}
                        isOpen={isMobileSidebarOpen}
                    />
                    
                    <div className="flex flex-col flex-1 w-full overflow-x-hidden">
                        <Navbar 
                            {...navBarProps} 
                            onMobileMenuClick={handleMobileMenuClick}
                        />
                        <main className="flex-1 overflow-y-auto pt-16 lg:pt-24 px-4 lg:px-8">
                            <Outlet />
                        </main>
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