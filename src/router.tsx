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
    Customer,
    Profile,
    EditProfile,
    Integration,
    StoreManagers,
    ManageSubscriptions
} from "./pages";
import Ads from "./pages/ads";

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

            },
            {
                path: "/profile",
                element: <Profile />,
                
            },
            {
                path: "/integration",
                element: <Integration />,
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
            },
            {
                path: "/profile/:id/edit/",
                element: <EditProfile />
            },
            {
                path: "/profile/store-managers/",
                element: <StoreManagers />
            },
            {
                path: "/profile/subscription-plan",
                element: <ManageSubscriptions />
            },
        ]
    }
])

export default router;