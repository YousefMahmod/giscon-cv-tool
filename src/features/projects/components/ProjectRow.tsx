import CustomIcon from "@app/components/icons/CustomIcon";
import dayjs from "dayjs";
import { Edit, Eye } from "iconsax-react";
import type { ProjectListItem } from "../projects.types";
import { MdDelete } from "react-icons/md";
import { navigateTo } from "@app/utils/navigation";
import { ROUTES } from "@app/constants/routes";

interface ProjectRowProps {
  project: ProjectListItem;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGenerateReport?: (id: string) => void;
}

export default function ProjectRow({
  project,
  onView,
  onEdit,
  onDelete,
}: ProjectRowProps) {
  return (
    <>
      {/* Project Name & Client */}
      <td className="px-6 py-4 cursor-pointer">
        <div
          className="cursor-pointer"
          onClick={() => navigateTo(`${ROUTES.projectList.path}/${project.id}`)}
        >
          <div className="text-sm font-semibold text-text-primary">
            {project.name}
          </div>
          <div className="text-xs text-text-secondary">{project.client}</div>
        </div>
      </td>

      {/* Timeline */}
      <td className="px-6 py-4">
        <div className="text-sm text-text-primary">
          {project.startDate
            ? dayjs(project.startDate).format("MMM YYYY")
            : "N/A"}
          {" - "}
          {project.endDate
            ? dayjs(project.endDate).format("MMM YYYY")
            : "Present"}
        </div>
      </td>

      {/* Technologies */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-primary text-on-primary rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 text-text-secondary text-xs">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-3">
          <CustomIcon
            IconComponent={Eye}
            size={16}
            color="icon-primary"
            onClick={() => onView?.(project.id)}
          />

          <CustomIcon
            IconComponent={Edit}
            size={16}
            color="icon-primary"
            onClick={() => onEdit?.(project.id)}
          />

          <CustomIcon
            IconComponent={MdDelete}
            size={16}
            color="text-error"
            onClick={() => onDelete?.(project.id)}
          />
        </div>
      </td>
    </>
  );
}
