import { useParams, useNavigate } from "react-router-dom";
import { Edit, DocumentText } from "iconsax-react";
import useStaffDetails from "../hooks/useStaffDetails";
import { Avatar } from "@app/components/ui/Avatar";
import { Button } from "@app/components/ui/Button";
import PageHeader from "@app/components/PageHeader";
import TechnicalSkills from "../components/TechnicalSkills";
import CustomIcon from "@app/components/icons/CustomIcon";
import { ROUTES } from "@app/constants/routes";
import ProjectHistory from "../components/ProjectHistory";

export default function StaffDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: staff, isLoading, error } = useStaffDetails(id || "");

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading staff details...</div>
      </div>
    );
  }

  if (error || !staff) {
    return (
      <div className="p-8">
        <div className="text-error">Error loading staff details</div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-8 max-w-7xl w-full mx-auto">
      <PageHeader title="Staff Details" />

      {/* Header Section */}
      <div className="bg-bg-white border border-border rounded-lg p-6 lg:p-8 mb-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <Avatar
            src={staff.imageSrc}
            alt={staff.name}
            fallback={getInitials(staff.name)}
            size="xl"
          />
          <div className="flex-1 w-full">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-h1 font-bold text-text-primary">
                  {staff.name}
                </h1>
                <p className="text-base text-text-secondary mt-1">
                  {staff.jobTitle || "N/A"}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    📧 {staff.email}
                  </span>
                  {staff.phone && (
                    <span className="flex items-center gap-1">
                      📱 {staff.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button
                  variant="secondary"
                  icon={
                    <CustomIcon
                      IconComponent={Edit}
                      size={18}
                      color="text-text-primary"
                    />
                  }
                  onClick={() =>
                    navigate(ROUTES.staffEdit.path.replace(":id", staff.id))
                  }
                  className="w-full sm:w-auto"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="primary"
                  icon={<CustomIcon IconComponent={DocumentText} size={18} />}
                  onClick={() =>
                    navigate(`${ROUTES.cvGenerator.path}?staffId=${staff.id}`)
                  }
                  className="w-full sm:w-auto"
                >
                  Generate CV
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Professional Summary & Skills */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Professional Summary */}
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <h2 className="text-base font-semibold text-text-primary mb-3">
              Professional Summary
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {staff.bio || "No bio available"}
            </p>
          </div>

          {/* Technical Skills */}
          <TechnicalSkills skills={staff.skills} />
        </div>

        {/* Right Column - Project History */}
        <div className="lg:col-span-2">
          <ProjectHistory projects={staff.projects} />
        </div>
      </div>
    </div>
  );
}
