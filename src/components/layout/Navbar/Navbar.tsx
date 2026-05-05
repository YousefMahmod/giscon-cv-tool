import { Logo } from "@app/components/Logo";
import { HambergerMenu } from "iconsax-react";
import CustomIcon from "../../icons/CustomIcon";
import { Button } from "../../ui/Button";
import AdminProfile from "./AdminProfile";

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <nav className="h-16 bg-bg-white border-b border-border px-4 md:px-6 flex items-center justify-between lg:justify-end print:hidden">
      {/* Mobile: Hamburger + Logo */}
      <div className="flex items-center gap-4 lg:hidden">
        <Button
          onClick={onMenuClick}
          icon={<CustomIcon IconComponent={HambergerMenu} size={16} />}
          aria-label="Toggle menu"
        />
        <Logo size="sm" />
      </div>

      <AdminProfile />
    </nav>
  );
};
