import { Dropdown } from "@app/components";
import useStaffWithProjects from "../../participation/hooks/useStaffWithProjects";
import type { StaffWithProjectsApiResponse } from "../../participation/participation.types";

interface StaffSelectorProps {
  selectedStaff: StaffWithProjectsApiResponse | null;
  onSelect: (staff: StaffWithProjectsApiResponse | null) => void;
}

const StaffSelector = ({ selectedStaff, onSelect }: StaffSelectorProps) => {
  const { data: staffWithProjects, isLoading: isLoadingStaff } =
    useStaffWithProjects();

  const handleStaffSelect = (value: string | number) => {
    const staff = staffWithProjects?.find(
      (s) => s.staff_id.toString() === value.toString(),
    );
    onSelect(staff || null);
  };

  const staffOptions = (staffWithProjects || [])
    .filter((staff) => staff.projects && staff.projects.length > 0)
    .map((staff) => ({
      label: staff.staff_name,
      value: staff.staff_id.toString(),
    }));

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-sm font-semibold text-text-secondary uppercase mb-2">
          Select Staff Member
        </h3>
      </div>
      <Dropdown
        label="Staff"
        placeholder="Select staff member..."
        options={staffOptions}
        value={selectedStaff?.staff_id.toString() || ""}
        onChange={handleStaffSelect}
        disabled={isLoadingStaff}
      />
      {selectedStaff && (
        <div className="mt-4 p-4 bg-bg-input rounded-lg border border-border">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">
              {selectedStaff.staff_name}
            </span>{" "}
            has {selectedStaff.projects.length} project
            {selectedStaff.projects.length !== 1 ? "s" : ""} available
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffSelector;
