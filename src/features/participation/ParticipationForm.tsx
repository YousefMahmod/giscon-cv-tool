import { useState, useMemo } from "react";
import { PageHeader, Button, AppInput } from "@app/components";
import Dropdown, { type DropdownOption } from "@app/components/ui/Dropdown";
import { Label } from "@app/components/ui/label";
import useStaffWithProjects from "./hooks/useStaffWithProjects";
import useProjectList from "../projects/hooks/useProjectList";
import useCreateParticipation from "./hooks/useCreateParticipation";
import { PARTICIPATION_CONSTANTS } from "./participation.constants";
import { showToast } from "@app/utils/toasts";

const ParticipationForm = () => {
  // Local state for form inputs
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [role, setRole] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  // Form validation errors
  const [errors, setErrors] = useState({
    staff: "",
    project: "",
    role: "",
  });

  // Fetch staff with their projects
  const {
    data: staffWithProjects,
    dataUpdatedAt: staffDataUpdatedAt,
    isLoading: isLoadingStaff,
  } = useStaffWithProjects();

  // Fetch all projects
  const {
    data: projectsData,
    dataUpdatedAt: projectsDataUpdatedAt,
    isLoading: isLoadingProjects,
  } = useProjectList();

  // Create participation mutation
  const createMutation = useCreateParticipation();

  // Transform staff data to dropdown options
  const staffOptions: DropdownOption[] = useMemo(() => {
    if (!staffWithProjects) return [];
    return staffWithProjects.map((staff) => ({
      label: staff.staff_name,
      value: staff.staff_id,
    }));
  }, [staffWithProjects]);

  // Get selected staff's existing projects
  const staffExistingProjects = useMemo(() => {
    if (!selectedStaffId || !staffWithProjects) return [];
    const staff = staffWithProjects.find((s) => s.staff_id === selectedStaffId);
    return staff?.projects.map((p) => p.project_id) || [];
  }, [selectedStaffId, staffDataUpdatedAt]);

  // Transform projects data to dropdown options (excluding staff's existing projects)
  const projectOptions: DropdownOption[] = useMemo(() => {
    if (!projectsData?.data) return [];
    return projectsData.data
      .filter((project) => !staffExistingProjects.includes(Number(project.id)))
      .map((project) => ({
        label: project.name,
        value: Number(project.id),
      }));
  }, [projectsDataUpdatedAt, staffExistingProjects]);

  // Handle staff selection
  const handleStaffChange = (value: string | number) => {
    setSelectedStaffId(Number(value));
    setSelectedProjectId(null); // Reset project selection
    setErrors((prev) => ({ ...prev, staff: "" }));
  };

  // Handle project selection
  const handleProjectChange = (value: string | number) => {
    setSelectedProjectId(Number(value));
    setErrors((prev) => ({ ...prev, project: "" }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors = {
      staff: "",
      project: "",
      role: "",
    };

    if (!selectedStaffId) {
      newErrors.staff = "Please select a staff member";
    }
    if (!selectedProjectId) {
      newErrors.project = "Please select a project";
    }
    if (!role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return !newErrors.staff && !newErrors.project && !newErrors.role;
  };

  // Reset form
  const resetForm = () => {
    setSelectedStaffId(null);
    setSelectedProjectId(null);
    setRole("");
    setResponsibilities("");
    setErrors({ staff: "", project: "", role: "" });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await createMutation.mutateAsync({
      staff_id: selectedStaffId!,
      staff_name:
        staffOptions.find((s) => s.value === selectedStaffId)?.label || "",
      project_name:
        projectOptions.find((p) => p.value === selectedProjectId)?.label || "",
      project_id: selectedProjectId!,
      role: role.trim(),
      responsibilities: responsibilities.trim() || undefined,
    });

    showToast({
      title: "Success",
      subtitle: "Staff linked to project successfully!",
    });
    resetForm();
  };

  const isLoading = isLoadingStaff || isLoadingProjects;

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Staff Assignment"
        subtitle="Associate technical experts with active projects and define their specific functional roles and strategic responsibilities."
        hideBackButton
      />

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          {/* Form Fields */}
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Staff Selection */}
              <Dropdown
                label="Technical Expert"
                placeholder={PARTICIPATION_CONSTANTS.FORM_PLACEHOLDERS.STAFF}
                options={staffOptions}
                value={selectedStaffId || undefined}
                onChange={handleStaffChange}
                searchable
                hasError={!!errors.staff}
                helperText={errors.staff}
              />

              {/* Project Selection */}
              <Dropdown
                label="Select Project"
                placeholder={PARTICIPATION_CONSTANTS.FORM_PLACEHOLDERS.PROJECT}
                options={projectOptions}
                value={selectedProjectId || undefined}
                onChange={handleProjectChange}
                disabled={!selectedStaffId}
                searchable
                hasError={!!errors.project}
                helperText={
                  errors.project ||
                  (!selectedStaffId
                    ? "Select a staff member first"
                    : projectOptions.length === 0
                      ? "No available projects for this staff"
                      : undefined)
                }
              />
            </div>

            <div className="mt-4">
              <AppInput
                variant="primary"
                label="Functional Role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setErrors((prev) => ({ ...prev, role: "" }));
                }}
                placeholder={PARTICIPATION_CONSTANTS.FORM_PLACEHOLDERS.ROLE}
                hasError={!!errors.role}
                helperText={errors.role}
              />
            </div>
          </div>

          {/* Core Responsibilities */}
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <Label className="text-text-secondary text-xs font-semibold">
              Core Responsibilities
            </Label>
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder={
                PARTICIPATION_CONSTANTS.FORM_PLACEHOLDERS.RESPONSIBILITIES
              }
              className="mt-1 w-full min-h-30 px-4 py-3 bg-bg-white border border-border text-text-primary placeholder:text-text-secondary rounded-md text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              rows={6}
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={resetForm}
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={createMutation.isPending}
              className="w-full sm:w-auto"
            >
              Link Staff
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ParticipationForm;
