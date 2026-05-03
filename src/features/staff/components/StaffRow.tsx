import { Eye, Edit, DocumentText } from "iconsax-react";
import { Avatar } from "@app/components/ui/Avatar";
import type { StaffListItem } from "../staff.types";
import CustomIcon from "@app/components/icons/CustomIcon";
import { navigateTo } from "@app/utils/navigation";
import { ROUTES } from "@app/constants/routes";

interface StaffRowProps {
  staff: StaffListItem;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onGenerateCV?: (id: string) => void;
}

export default function StaffRow({
  staff,
  onView,
  onEdit,
  onGenerateCV,
}: StaffRowProps) {
  return (
    <>
      {/* Employee */}
      <td className="px-6 py-4">
        <div
          className="flex items-center gap-4"
          onClick={() => navigateTo(`${ROUTES.staffList.path}/${staff.id}`)}
        >
          <Avatar src={staff.imageSrc} alt={staff.name} size="md" />
          <div>
            <div className="font-semibold text-text-primary">{staff.name}</div>
            <div className="text-sm text-text-secondary">{staff.email}</div>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <div className="text-sm text-text-primary font-medium">
          {staff.jobTitle}
        </div>
      </td>

      {/* Key Skills */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {staff.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-primary text-on-primary rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {staff.skills.length > 3 && (
            <span className="px-2 py-0.5 text-text-secondary text-xs">
              +{staff.skills.length - 3} more
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onView?.(staff.id)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            title="View Profile"
          >
            <CustomIcon IconComponent={Eye} size={16} color="icon-primary" />
          </button>
          <button
            onClick={() => onEdit?.(staff.id)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            title="Edit Employee"
          >
            <CustomIcon IconComponent={Edit} size={16} color="icon-primary" />
          </button>
          <button
            onClick={() => onGenerateCV?.(staff.id)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            title="Generate CV"
          >
            <CustomIcon
              IconComponent={DocumentText}
              size={16}
              color="icon-primary"
            />
          </button>
        </div>
      </td>
    </>
  );
}
