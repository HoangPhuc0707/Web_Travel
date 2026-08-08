import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)] text-white shadow-[var(--shadow-md)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-lg)]",
        red: "bg-[linear-gradient(135deg,var(--color-red)_0%,#FF4D5E_100%)] text-white shadow-[var(--shadow-red)] hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(232,25,44,0.35)]",
        outline: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-[2px]",
        ghost: "text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark)] hover:gap-4",
      },
      size: {
        default: "px-[28px] py-[14px] text-[15px]",
        sm: "h-9 px-3",
        lg: "px-[40px] py-[18px] text-[17px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
