import { createBrowserRouter } from "react-router-dom";
import { NavLeft, NavRight } from "./components/dashboard";
import { DashboardLayout, HomeLayout } from "./layouts";
import { inventoryLoader } from "./lib/loaders";
import {
    Dashboard,
    EditInventory,
    EditOrder,
    Home,
    Inventory,
    MyBank,
    Orders,
    Sales,
    Todo,
    Customer
} from "./pages";
import Ads from "./pages/ads";
import Login from "./pages/login";
import LoginSignupLayout from "./layouts/LoginSignupLayout";
import Signup from "./pages/signup";
import Businesssetup from "./pages/businesssetup";

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
                loader: inventoryLoader,
                element: <Inventory />,
                // element: <Inventory />

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
            },
            {
                path: "/ads",
                element: <Ads />
            },
            {
                path: "/customers",
                element: <Customer />

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
                path: "/editinventory",
                element: <EditInventory />
            },
            {
                path: "/orders/:id/edit",
                element: <EditOrder />
            }
        ]
    },
    {
        path: "/",
        element: <LoginSignupLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/setupbusiness",
                element: <Businesssetup />
            },
        ]
    }
])

export default router;