import { cn } from "@app/utils/style";
import { type FC } from "react";

const CustomIcon: FC<CustomIconProps> = ({
  IconComponent,
  color = "text-text-white",
  size = 24,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-0 h-fit w-fit",
        { "cursor-pointer": onClick },
        className,
      )}
    >
      <IconComponent size={size} color={colorMapping[color]} />
    </button>
  );
};

export default CustomIcon;

const colorMapping: Record<string, string> = {
  "text-text-white": "#ffffff",
  "text-text-inactive": "#dddddd",
  "text-text-secondary": "#666666",
  "text-text-primary": "#1a1c1c",
  "icon-primary": "#1283ae",
  "text-error": "#ff4d4f",
};

export interface CustomIconProps {
  IconComponent: React.FC<any>;
  onClick?: () => void;
  color?: keyof typeof colorMapping;
  size?: string | number;
  className?: string;
}
