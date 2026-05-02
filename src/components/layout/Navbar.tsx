import { useState } from "react";
import { Logo } from "@app/components/Logo";
import { HambergerMenu, SearchNormal1 } from "iconsax-react";
import { Avatar } from "@app/components/ui/Avatar";
import AppInput from "@app/components/AppInput";

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="h-16 bg-bg-white border-b border-border px-4 md:px-6 flex items-center justify-between">
      {/* Mobile: Hamburger + Logo */}
      <div className="flex items-center gap-4 lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-bg-input rounded-lg transition-colors text-text-secondary"
          aria-label="Toggle menu"
        >
          <HambergerMenu size={24} variant="Bold" color="#666666" />
        </button>
        <Logo size="sm" variant="default" />
      </div>

      {/* Desktop: Search */}
      <div className="hidden lg:block flex-1 max-w-md">
        <AppInput
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search staff by name, role, or skill..."
          leftIcon={<SearchNormal1 size={18} color="#666666" />}
          variant="default"
        />
      </div>

      {/* Right: Divider + User Profile */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-px bg-border mx-2"></div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-xs text-text-primary font-medium">
            Admin User
          </span>
          <Avatar alt="Admin User" fallback="AU" size="sm" />
        </div>
      </div>
    </nav>
  );
};
