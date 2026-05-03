import { Global } from "iconsax-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
}

export const Logo = ({ size = "md", variant = "light" }: LogoProps) => {
  const sizes = {
    sm: {
      icon: 24,
      text: "text-base",
    },
    md: {
      icon: 32,
      text: "text-xl",
    },
    lg: {
      icon: 40,
      text: "text-2xl",
    },
  };

  const currentSize = sizes[size];
  const textColor =
    variant === "dark" ? "text-text-white" : "text-text-secondary";

  return (
    <div className="flex flex-col items-center gap-1">
      <Global size={currentSize.icon} color="#1283ae" variant="Bold" />
      <span
        className={`${currentSize.text} font-bold ${textColor} tracking-wide`}
      >
        GISCON
      </span>
    </div>
  );
};
