import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Refresh } from "iconsax-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  title?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      title,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-primary text-on-primary hover:opacity-90 focus:ring-primary",
      secondary:
        "bg-bg-white text-text-primary border border-border hover:bg-bg-input focus:ring-primary",
      ghost:
        "bg-transparent text-text-primary hover:bg-bg-input focus:ring-border",
      danger: "bg-error text-bg-white hover:opacity-90 focus:ring-error",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        className={`cursor-pointer ${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Refresh size={16} className="animate-spin" />}
        {!loading && icon && iconPosition === "left" && icon}
        {title || children}
        {!loading && icon && iconPosition === "right" && icon}
      </button>
    );
  },
);

Button.displayName = "Button";
