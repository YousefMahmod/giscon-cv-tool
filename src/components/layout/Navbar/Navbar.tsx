import AppInput from "@app/components/AppInput";
import { Logo } from "@app/components/Logo";
import { HambergerMenu, SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import CustomIcon from "../../icons/CustomIcon";
import { Button } from "../../ui/Button";
import AdminProfile from "./AdminProfile";

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="h-16 bg-bg-white border-b border-border px-4 md:px-6 flex items-center justify-between print:hidden">
      {/* Mobile: Hamburger + Logo */}
      <div className="flex items-center gap-4 lg:hidden">
        <Button
          onClick={onMenuClick}
          icon={<CustomIcon IconComponent={HambergerMenu} size={16} />}
          aria-label="Toggle menu"
        />
        <Logo size="sm" />
      </div>

      {/* Desktop: Search */}
      <div className="hidden lg:block flex-1 max-w-md">
        <AppInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search staff by name, role, or skill..."
          leftIcon={
            <CustomIcon
              IconComponent={SearchNormal1}
              color={"text-text-secondary"}
              size={16}
            />
          }
          variant="default"
        />
      </div>

      <AdminProfile />
    </nav>
  );
};
