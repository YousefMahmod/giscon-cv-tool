import { NavLink } from "react-router-dom";
import { Logo } from "@app/components/Logo";
import { Overlay } from "@app/components/ui/Overlay";
import { navLinks } from "../../constants/links";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay backdrop */}
      <Overlay isOpen={isOpen} onClick={onToggle} className="lg:hidden" />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 bg-bg-sidebar border-r border-border
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="px-6 py-6">
          <Logo variant="sidebar" />
        </div>

        <nav className="px-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-4 py-3 transition-all duration-200",
                  isActive
                    ? "bg-bg-sidebar-active border-l-4 border-border-active text-text-white font-semibold rounded-r-md"
                    : "text-text-inactive hover:bg-bg-sidebar-active hover:text-text-white",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <div className="shrink-0">
                    {link.icon(isActive ? "#ffffff" : "#dddddd")}
                  </div>
                  <span
                    className={`${isActive ? "font-semibold" : "font-normal"}`}
                  >
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
