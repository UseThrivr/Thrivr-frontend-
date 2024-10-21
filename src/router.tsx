import { createBrowserRouter } from "react-router-dom";
import { NavLeft, NavRight } from "./components/dashboard";
import { DashboardLayout, HomeLayout } from "./layouts";
import { Dashboard, EditInventory, EditOrder, Home, Inventory, MyBank, Orders, Sales, Todo } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: "/",
        element: <DashboardLayout right={<NavRight />} />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/inventory",
                element: <Inventory />
            },
            {
                path: "/mybank",
                element: <MyBank />
            },
            {
                path: "/orders",
                element: <Orders />
            },
            {
                path: "/sales",
                element: <Sales />
            },
            {
                path: "/todo",
                element: <Todo />
            }
        ]
    },
    {
        path: "/",
        element: <DashboardLayout left={<NavLeft />} />,
        children: [
            {
                path: "/inventory/:id/edit",
                element: <EditInventory />
            },
            {
                path: "/orders/:id/edit",
                element: <EditOrder />
            }
        ]
    }
])

export default router;