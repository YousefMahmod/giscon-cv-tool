import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar/Navbar";
import { ROUTES } from "@app/constants/routes";

export const AppLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // CV Preview has no nav/sidebar
  if (location.pathname === ROUTES.cvPreview.path) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 max-w-7xl w-full mx-auto overflow-auto bg-background p-4 md:py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
