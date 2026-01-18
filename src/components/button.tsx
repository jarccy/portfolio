import * as React from "react"
import { cn } from "@/lib/utils"

const defaultClassName = "inline-flex  select-none items-center gap-2 cursor-pointer rounded-2xl px-2 md:px-6 py-1.5 font-medium hover:scale-105 transition-transform duration-300 text-white dark:text-zinc-900 bg-primary active:scale-95 active:brightness-90"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(defaultClassName, className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
