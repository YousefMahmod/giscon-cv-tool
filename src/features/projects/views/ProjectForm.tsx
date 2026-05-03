import AppInput from "@app/components/AppInput";
import CustomIcon from "@app/components/icons/CustomIcon";
import PageHeader from "@app/components/PageHeader";
import { Button } from "@app/components/ui/Button";
import { Label } from "@app/components/ui/label";
import { ROUTES } from "@app/constants/routes";
import { navigateTo } from "@app/utils/navigation";
import { formatDate } from "@app/utils/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add, CloseCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import useCreateProject from "../hooks/useCreateProject";
import useProjectDetails from "../hooks/useProjectDetails";
import useUpdateProject from "../hooks/useUpdateProject";

// Zod validation schema
const projectFormSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  client: z.string().min(2, "Client name must be at least 2 characters"),
  location: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  description: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();

  const isEditMode = !!id;

  // Technologies state (separate from form state)
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");

  // Fetch project details if editing
  const {
    data: project,
    dataUpdatedAt,
    isLoading,
  } = useProjectDetails(id || "");

  // Form with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      client: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
    },
  });

  // Mutations
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  // Populate form when editing
  useEffect(() => {
    if (project && isEditMode) {
      reset({
        name: project.name,
        client: project.client,
        location: project.location || "",
        start_date: formatDate(project.startDate),
        end_date: formatDate(project.endDate),
        description: project.description || "",
      });

      Promise.resolve().then(() => {
        setTechnologies(project.technologies || []);
      });
    }
  }, [dataUpdatedAt, isEditMode]);

  const handleAddTech = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech("");
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTech();
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    const payload = {
      ...data,
      technologies:
        technologies.length > 0 ? technologies.join(", ") : undefined,
    };

    if (isEditMode && id) {
      await updateMutation.mutateAsync({ id, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    navigateTo(ROUTES.projectList.path);
  };

  if (isLoading && isEditMode) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={isEditMode ? "Edit Project" : "Add Project"}
        subtitle={
          isEditMode
            ? "Update the project information"
            : "Create a new project for the GISCON engineering directory."
        }
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          {/* General Information */}
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <Label className="text-text-secondary text-xs font-semibold mb-4 block">
              General Information
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AppInput
                variant="primary"
                label="Project Name"
                {...register("name")}
                placeholder="e.g. Skyline Bridge Reconstruction"
                hasError={!!errors.name?.message}
                helperText={errors.name?.message}
              />

              <AppInput
                variant="primary"
                label="Client"
                {...register("client")}
                placeholder="e.g. Department of Infrastructure"
                hasError={!!errors.client?.message}
                helperText={errors.client?.message}
              />
            </div>
            <div className="mt-4">
              <AppInput
                variant="primary"
                label="Location"
                {...register("location")}
                placeholder="City, Country or Coordinates"
                hasError={!!errors.location?.message}
                helperText={errors.location?.message}
              />
            </div>
          </div>

          {/* Timeline & Duration */}
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <Label className="text-text-secondary text-xs font-semibold mb-4 block">
              Timeline & Duration
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AppInput
                variant="primary"
                label="Start Date"
                type="date"
                {...register("start_date")}
                hasError={!!errors.start_date?.message}
                helperText={errors.start_date?.message}
                className="w-full"
              />

              <AppInput
                variant="primary"
                label="End Date (Projected)"
                type="date"
                {...register("end_date")}
                hasError={!!errors.end_date?.message}
                helperText={errors.end_date?.message}
                className="w-full"
              />
            </div>
          </div>

          {/* Technical Scope */}
          <div className="bg-bg-white border border-border rounded-lg p-6">
            <Label className="text-text-secondary text-xs font-semibold mb-4 block">
              Technical Scope
            </Label>

            {/* Project Description */}
            <div className="mb-4">
              <Label className="text-text-secondary text-xs font-semibold">
                Project Description
              </Label>
              <textarea
                {...register("description")}
                placeholder="Detailed summary of technical requirements and project goals..."
                className="mt-1 w-full min-h-30 px-4 py-3 bg-bg-white border border-border text-text-primary placeholder:text-text-secondary rounded-md text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                rows={4}
              />
              {errors.description && (
                <p className="text-xs text-error mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Technologies & Systems Used */}
            <div>
              <Label className="text-text-secondary text-xs font-semibold">
                Technologies & Systems Used
              </Label>
              <div className="mt-1 flex flex-wrap gap-2 min-h-10 p-3 bg-bg-white border border-border rounded-md">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-medium"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="hover:opacity-80 cursor-pointer"
                    >
                      <CustomIcon IconComponent={CloseCircle} size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.currentTarget.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type and press enter..."
                  className="flex-1 px-4 py-2 bg-bg-white border border-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                />
                <Button
                  type="button"
                  variant="primary"
                  icon={<CustomIcon IconComponent={Add} size={18} />}
                  onClick={handleAddTech}
                  className="w-full sm:w-auto"
                >
                  Add
                </Button>
              </div>
              <p className="text-xs text-text-secondary mt-2 italic">
                Press Enter to add a technology tag.
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigateTo(ROUTES.projectList.path)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={createMutation.isPending || updateMutation.isPending}
              className="w-full sm:w-auto"
            >
              {isEditMode ? "Update Project" : "Save Project"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
