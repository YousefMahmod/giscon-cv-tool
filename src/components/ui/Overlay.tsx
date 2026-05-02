import { type ReactNode } from "react";

interface OverlayProps {
  isOpen: boolean;
  onClick?: () => void;
  blur?: boolean;
  opacity?: "light" | "medium" | "dark";
  children?: ReactNode;
  className?: string;
}

export const Overlay = ({
  isOpen,
  onClick,
  blur = false,
  opacity = "medium",
  children,
  className = "",
}: OverlayProps) => {
  if (!isOpen) return null;

  const opacities = {
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70",
  };

  return (
    <div
      className={`fixed inset-0 z-40 ${opacities[opacity]} ${blur ? "backdrop-blur-sm" : ""} ${className}`}
      onClick={onClick}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};
