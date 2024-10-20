import clsx from "clsx";

const Navbar: React.FC<NavBarProps> = ({ right, left }) => {
    return (
        <nav className={clsx(
            "flex items-center py-[24px] px-[16px] absolute right-0 top-0 w-[calc(100%-var(--dashboard-sidebar-width))] gap-[511px] bg-white border-b border-solid border-neutral-border",
            (left && right) && "justify-between",
            (right && !left) && "justify-end"
        )}>
            {left}
            {right}
        </nav>
    )
}

export default Navbar;