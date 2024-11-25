import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (
        <>
            {/* <ScrollRestoration /> */}
            <Outlet />
        </>
    )
}

export default HomeLayout;