// src/layouts/DashboardLayout.tsx
import { cn } from "@/lib/utils";
import { Navbar, Sidebar } from "@/components/dashboard";
import { SidebarProvider as UISidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSidebar } from "@/context/SidebarContext";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// First, create the custom scrollbar utility in your global CSS file (e.g., index.css or globals.css)
// @layer utilities {
//   .scrollbar-hide {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;mn njbhjkbhn n vkmknkhj  n
//   }
// }

interface NavBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const DashboardLayout: React.FC<NavBarProps> = (navBarProps) => {
  const { isMobileSidebarOpen, setMobileSidebarOpen } = useSidebar();
  const { isAuthenticated } = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      <UISidebarProvider
        open
        style={
          {
            "--sidebar-width": "var(--dashboard-sidebar-width)",
          } as React.CSSProperties
        }
      >
        <div className="flex h-screen w-full">
          <Sidebar
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 lg:w-[var(--dashboard-sidebar-width)] bg-white transform transition-transform duration-300 ease-in-out",
              isMobileSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            )}
            onClose={() => setMobileSidebarOpen(false)}
            isOpen={isMobileSidebarOpen}
          />

          <div className="flex relative flex-col flex-1 w-full overflow-hidden lg:ml-[var(--dashboard-sidebar-width)]">
            <Navbar {...navBarProps} />
            <main
              className={cn(
                "flex-1 h-screen w-full py-4 px-4",
                "overflow-y-auto scrollbar-hide" // Add these classes
              )}
            >
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
  );
};

export default DashboardLayout;
