import { type FC } from "react";

const CustomIcon: FC<CustomIconProps> = ({
  IconComponent,
  color = "text-text-white",
  size = 24,
  ...rest
}) => {
  const colorMapping = {
    "text-text-white": "#ffffff",
    "text-text-inactive": "#dddddd",
    "text-text-secondary": "#666666",
    "text-text-primary": "#1a1c1c",
    "icon-primary": "#1283ae",
    "text-error": "#ff4d4f",
  };
  return (
    <IconComponent size={size} color={colorMapping[color] || color} {...rest} />
  );
};

export default CustomIcon;

export interface CustomIconProps {
  IconComponent: React.FC<any>;
  color?: string;
  customColor?: string;
  size?: string | number;
}
