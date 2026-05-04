import { Profile2User, Folder2, DocumentText, Link2 } from "iconsax-react";
import type { ReactElement } from "react";
import CustomIcon from "../components/icons/CustomIcon";

interface NavLink {
  path: string;
  label: string;
  icon: (color: string) => ReactElement;
}
export const navLinks: NavLink[] = [
  {
    path: "/staff",
    label: "Staff",
    icon: (color: string) => (
      <CustomIcon IconComponent={Profile2User} color={color} size={24} />
    ),
  },
  {
    path: "/projects",
    label: "Projects",
    icon: (color: string) => (
      <CustomIcon IconComponent={Folder2} color={color} size={24} />
    ),
  },
  {
    path: "/participation",
    label: "Link Staff",
    icon: (color: string) => (
      <CustomIcon IconComponent={Link2} color={color} size={24} />
    ),
  },
  {
    path: "/generator",
    label: "Generator",
    icon: (color: string) => (
      <CustomIcon IconComponent={DocumentText} color={color} size={24} />
    ),
  },
];
