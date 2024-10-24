import { cn } from "@/lib/utils";
import React from "react";

export const H1: React.FC<React.ComponentProps<"h1">> = ({ className, ...props }) => {
    return (
        <h1
            {...props}
            className={cn(
                "font-semibold text-[48px] leading-[53px] tracking-[-0.01em] text-text-primary",
                className
            )}
        />
    )
}

export const P: React.FC<React.ComponentProps<"p">> = ({ className, ...props }) => {
    return (
        <p
            {...props}
            className={cn(
                "font-medium text-[16px] leading-[22px] text-text-secondary",
                className
            )}
        />
    )
}

export const H4: React.FC<React.ComponentProps<"h4">> = ({ className, ...props }) => {
    return (
        <h4
            {...props}
            className={cn(
                "font-medium text-[20px] leading-[28px] text-text-primary",
                className
            )}
        />
    )
}