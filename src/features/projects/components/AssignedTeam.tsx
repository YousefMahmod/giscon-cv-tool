import { Avatar } from "@app/components/ui/Avatar";
import { ROUTES } from "@app/constants/routes";
import { navigateTo } from "@app/utils/navigation";
import type { ProjectStaff } from "../projects.types";
import CustomIcon from "@app/components/icons/CustomIcon";
import { Profile2User } from "iconsax-react";

interface Props {
  staffs: ProjectStaff[];
}

export default function AssignedTeam({ staffs }: Props) {
  return (
    <div className="bg-bg-white border border-border rounded-lg p-6">
      <div className="flex gap-2 items-center mb-4">
        <CustomIcon
          IconComponent={Profile2User}
          size={18}
          color="text-text-primary"
        />
        <h2 className="text-lg font-semibold text-text-primary">
          Assigned Staff
        </h2>
      </div>

      {staffs.length === 0 ? (
        <div className="text-center py-8 text-text-secondary">
          <p>No staff members assigned to this project</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {staffs.map((staff) => (
            <div
              key={staff.id}
              className="flex gap-4 items-center hover:border-primary transition-colors"
              onClick={() => navigateTo(`${ROUTES.staffList.path}/${staff.id}`)}
            >
              <Avatar src={staff.imageSrc} alt={staff.name} size="md" />

              <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-text-primary">
                  {staff.name}
                </h3>
                {staff.role && (
                  <p className="text-sm text-text-secondary">{staff.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
