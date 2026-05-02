import { cn } from "@app/utils/style";
import React from "react";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, hasError, leftIcon, rightIcon, variant = "default", ...props },
    ref,
  ) => {
    const variantStyles = {
      default:
        "bg-bg-input border-border text-text-primary placeholder:text-text-secondary",
      primary:
        "bg-bg-white border-border text-text-primary placeholder:text-text-secondary",
      filled:
        "bg-bg-sidebar border-bg-sidebar text-text-white placeholder:text-text-inactive",
    };

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          className={cn(
            "flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "focus:outline-none focus:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            variantStyles[variant],
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            hasError && "border-error focus:border-error",
            className,
          )}
          ref={ref}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "primary" | "filled";
}
