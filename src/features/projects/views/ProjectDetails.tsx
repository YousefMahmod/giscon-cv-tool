import PageHeader from "@app/components/PageHeader";
import CustomIcon from "@app/components/icons/CustomIcon";
import { Button } from "@app/components/ui/Button";
import { ROUTES } from "@app/constants/routes";
import AssignedTeam from "@app/features/projects/components/AssignedTeam";
import ProjectOverview from "@app/features/projects/components/ProjectOverview";
import { navigateTo } from "@app/utils/navigation";
import { Edit } from "iconsax-react";
import { useParams } from "react-router-dom";
import useProjectDetails from "../hooks/useProjectDetails";
import { handleApiError } from "@app/utils/errors";

const ProjectDetails = () => {
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
        <div className="text-error">{handleApiError(error as any)}</div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={project.name}
        actions={
          <Button
            icon={<CustomIcon IconComponent={Edit} size={18} />}
            onClick={() =>
              navigateTo(ROUTES.projectEdit.path.replace(":id", project.id))
            }
          >
            Edit Project
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Overview + Technologies */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ProjectOverview project={project} />

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
        <div className="lg:col-span-1">
          <AssignedTeam staffs={project.staffs} />
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
