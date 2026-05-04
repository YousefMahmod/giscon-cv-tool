import CustomIcon from "@app/components/icons/CustomIcon";
import { formatDate } from "@app/utils/shared";
import { Location } from "iconsax-react";
import type { ProjectDetails } from "../projects.types";

interface Props {
  project: ProjectDetails;
}

export default function ProjectOverview({ project }: Props) {
  const start = formatDate(project.startDate, "MMM YYYY") || "N/A";
  const end = formatDate(project.endDate, "MMM YYYY") || "Present";

  return (
    <div className="bg-bg-white border border-border rounded-lg p-6">
      <h2 className="text-base font-semibold text-text-primary mb-3">
        Project Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-secondary mb-4">
        <div className="flex flex-col">
          <span className="text-xs uppercase text-text-secondary mb-1">
            Client Name
          </span>
          <span className="text-text-primary">{project.client}</span>
        </div>

        {project.location && (
          <div className="flex flex-col">
            <span className="text-xs uppercase text-text-secondary mb-1">
              Location
            </span>
            <div className="flex items-center gap-2">
              <CustomIcon
                IconComponent={Location}
                size={16}
                color="icon-primary"
              />
              <span className="text-text-primary">{project.location}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-xs uppercase text-text-secondary mb-1">
            Project Duration
          </span>
          <div className="flex gap-1">
            <span className="text-text-primary">
              {start} — {end}
            </span>
          </div>
        </div>
      </div>

      <hr className="my-4 border-border" />

      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          Full Description
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {project.description || "No description available"}
        </p>
      </div>
    </div>
  );
}
