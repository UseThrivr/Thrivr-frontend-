import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "./layouts";
import { Home } from "./pages";

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
    }
])

export default router;