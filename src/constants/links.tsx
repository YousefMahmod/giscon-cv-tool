import { Profile2User, Folder2, DocumentText } from "iconsax-react";
import type { ReactElement } from "react";

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
      <Profile2User color={color} size={24} variant="Bold" />
    ),
  },
  {
    path: "/projects",
    label: "Projects",
    icon: (color: string) => <Folder2 color={color} size={24} variant="Bold" />,
  },
  {
    path: "/generator",
    label: "Generator",
    icon: (color: string) => (
      <DocumentText color={color} size={24} variant="Bold" />
    ),
  },
];
