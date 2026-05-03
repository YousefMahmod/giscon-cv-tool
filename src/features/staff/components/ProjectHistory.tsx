import { Briefcase, Calendar } from "iconsax-react";
import { Badge } from "@app/components/ui/Badge";
import dayjs from "dayjs";
import type { StaffProject } from "../staff.types";
import CustomIcon from "@app/components/icons/CustomIcon";

interface ProjectHistoryProps {
  projects: StaffProject[];
  title?: string;
}

const ProjectHistory = ({
  projects,
  title = "Project History",
}: ProjectHistoryProps) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-bg-white border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          {title}
        </h2>
        <div className="text-center py-8 text-text-secondary">
          <Briefcase size={48} className="mx-auto mb-3 opacity-30" />
          <p>No project history available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-white border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <Badge variant="secondary">{projects.length} Projects</Badge>
      </div>

      <div className="space-y-4">
        {projects.map((project) => {
          const startDate = (project as any).startDate;
          const endDate = (project as any).endDate;

          return (
            <div
              key={project.participationId}
              className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {project.projectName}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {project.client}
                  </p>
                </div>

                <Badge variant="primary">{project.role}</Badge>
              </div>

              {(startDate || endDate) && (
                <div className="flex items-center gap-2 text-xs text-text-secondary mb-3">
                  <CustomIcon
                    IconComponent={Calendar}
                    size={14}
                    color="icon-primary"
                  />
                  <span>
                    {startDate ? dayjs(startDate).format("MMM YYYY") : ""}
                    {" - "}
                    {endDate ? dayjs(endDate).format("MMM YYYY") : "Present"}
                  </span>
                </div>
              )}

              {project.responsibilities &&
                project.responsibilities.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-text-secondary uppercase mb-2">
                      Responsibilities
                    </p>
                    <ul className="space-y-1">
                      {project.responsibilities.map((res, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-text-primary flex items-center gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectHistory;
