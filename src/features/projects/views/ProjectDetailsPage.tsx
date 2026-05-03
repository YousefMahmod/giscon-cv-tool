import PageHeader from "@app/components/PageHeader";
import CustomIcon from "@app/components/icons/CustomIcon";
import { Avatar } from "@app/components/ui/Avatar";
import { Badge } from "@app/components/ui/Badge";
import { Button } from "@app/components/ui/Button";
import { ROUTES } from "@app/constants/routes";
import dayjs from "dayjs";
import { Calendar, Edit, Location } from "iconsax-react";
import { useParams } from "react-router-dom";
import useProjectDetails from "../hooks/useProjectDetails";
import { navigateTo } from "@app/utils/navigation";

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProjectDetails(id || "");

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading project details...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-8">
        <div className="text-error">Error loading project details</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl w-full mx-auto">
      <PageHeader title="Project Details" />

      {/* Header Section */}
      <div className="bg-bg-white border border-border rounded-lg p-6 lg:p-8 mb-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-h1 font-bold text-text-primary">
              {project.name}
            </h1>
            <p className="text-base text-text-secondary mt-1">
              {project.client}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 text-sm text-text-secondary">
              {project.location && (
                <span className="flex items-center gap-1">
                  <CustomIcon IconComponent={Location} size={16} />
                  {project.location}
                </span>
              )}
              {(project.startDate || project.endDate) && (
                <span className="flex items-center gap-1">
                  <CustomIcon IconComponent={Calendar} size={16} />
                  {project.startDate
                    ? dayjs(project.startDate).format("MMM YYYY")
                    : "N/A"}
                  {" - "}
                  {project.endDate
                    ? dayjs(project.endDate).format("MMM YYYY")
                    : "Present"}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button
              variant="secondary"
              icon={<CustomIcon IconComponent={Edit} size={18} />}
              onClick={() =>
                navigateTo(ROUTES.projectEdit.path.replace(":id", project.id))
              }
              className="w-full sm:w-auto"
            >
              Edit Project
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Project Description */}
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <h2 className="text-base font-semibold text-text-primary mb-3">
              Project Description
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.description || "No description available"}
            </p>
          </div>

          {/* Technologies Used */}
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <h2 className="text-base font-semibold text-text-primary mb-3">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.length > 0 ? (
                project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <p className="text-sm text-text-secondary">
                  No technologies specified
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Assigned Staff */}
        <div className="lg:col-span-2">
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">
                Assigned Staff
              </h2>
              <Badge variant="secondary">{project.staffs.length} Members</Badge>
            </div>

            {project.staffs.length === 0 ? (
              <div className="text-center py-8 text-text-secondary">
                <p>No staff members assigned to this project</p>
              </div>
            ) : (
              <div className="space-y-4">
                {project.staffs.map((staff) => (
                  <div
                    key={staff.id}
                    className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar
                        src={staff.imageSrc}
                        alt={staff.name}
                        fallback={staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                        size="md"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-text-primary">
                              {staff.name}
                            </h3>
                            <p className="text-sm text-text-secondary">
                              {staff.email}
                            </p>
                            {staff.jobTitle && (
                              <p className="text-xs text-text-secondary mt-1">
                                {staff.jobTitle}
                              </p>
                            )}
                          </div>
                          <Badge variant="primary">{staff.role}</Badge>
                        </div>

                        {staff.responsibilities &&
                          staff.responsibilities.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <p className="text-xs font-semibold text-text-secondary uppercase mb-2">
                                Responsibilities
                              </p>
                              <ul className="space-y-1">
                                {staff.responsibilities.map((resp, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-text-primary flex items-start gap-2"
                                  >
                                    <span className="text-primary mt-1">•</span>
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
