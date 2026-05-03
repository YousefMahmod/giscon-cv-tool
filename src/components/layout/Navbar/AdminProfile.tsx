import { Avatar } from "../../ui/Avatar";

const AdminProfile = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-8 w-px bg-border mx-2"></div>
      <div className="flex items-center gap-3">
        <span className="hidden md:block text-xs text-text-primary font-medium">
          Admin User
        </span>
        <Avatar alt="Admin User" fallback="AU" size="sm" />
      </div>
    </div>
  );
};

export default AdminProfile;
