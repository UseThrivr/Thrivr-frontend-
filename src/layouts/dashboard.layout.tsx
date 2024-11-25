// src/layouts/DashboardLayout.tsx
import { cn } from "@/lib/utils"
import { Navbar, Sidebar } from "@/components/dashboard"
import { SidebarProvider as UISidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { useSidebar } from "@/context/SidebarContext"

// First, create the custom scrollbar utility in your global CSS file (e.g., index.css or globals.css)
// @layer utilities {
//   .scrollbar-hide {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;
//   }
// }

interface NavBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const DashboardLayout: React.FC<NavBarProps> = (navBarProps) => {
    const { isMobileSidebarOpen, setMobileSidebarOpen } = useSidebar();

    return (
        <>
            <UISidebarProvider
                open
                style={{ "--sidebar-width": "var(--dashboard-sidebar-width)" } as React.CSSProperties}
            >
                <div className="flex h-screen">
                    <Sidebar 
                        className={cn(
                            "fixed lg:relative inset-y-0 left-0 z-50 w-64 lg:w-[var(--dashboard-sidebar-width)] bg-white transform transition-transform duration-300 ease-in-out",
                            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        )}
                        onClose={() => setMobileSidebarOpen(false)}
                        isOpen={isMobileSidebarOpen}
                    />
                    
                    <div className="flex flex-col flex-1 w-full overflow-hidden">
                        <Navbar 
                            {...navBarProps}
                        />
                        <main className={cn(
                            "flex-1 mt-[10vh] h-screen w-full pt-16 lg:pt-24 px-4",
                            "overflow-y-auto scrollbar-hide" // Add these classes
                        )}>
                            <Outlet />
                        </main>
                    </div>
                </div>

                {/* {isMobileSidebarOpen && (
                    <div 
                        className="fixed inset-0 z-[-] bg-black/50 lg:hidden"
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                )} */}
            </UISidebarProvider>
        </>
    )
}

export default DashboardLayout
