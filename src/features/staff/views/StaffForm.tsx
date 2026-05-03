import AppInput from "@app/components/AppInput";
import CustomIcon from "@app/components/icons/CustomIcon";
import PageHeader from "@app/components/PageHeader";
import { Avatar } from "@app/components/ui/Avatar";
import { Button } from "@app/components/ui/Button";
import { Label } from "@app/components/ui/label";
import { ROUTES } from "@app/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add, CloseCircle, Gallery } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import useCreateStaff from "../hooks/useCreateStaff";
import useStaffDetails from "../hooks/useStaffDetails";
import useUpdateStaff from "../hooks/useUpdateStaff";

// Zod validation schema
const staffFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  job_title: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type StaffFormData = z.infer<typeof staffFormSchema>;

const StaffForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // File upload state (separate from form state)
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Fetch staff details if editing
  const { data: staff, isLoading } = useStaffDetails(id || "");

  // Form with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: "",
      email: "",
      job_title: "",
      phone: "",
      bio: "",
    },
  });

  // Mutations
  const createMutation = useCreateStaff();
  const updateMutation = useUpdateStaff();

  // Populate form when editing
  useEffect(() => {
    if (staff && isEditMode) {
      reset({
        name: staff.name,
        email: staff.email,
        job_title: staff.jobTitle || "",
        phone: staff.phone || "",
        bio: staff.bio || "",
      });
      // Avoid cascading renders by deferring setState
      Promise.resolve().then(() => {
        setProfilePicturePreview(staff.imageSrc || "");
        setSkills(staff.skills || []);
      });
    }
  }, [staff, isEditMode]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setProfilePicture(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: StaffFormData) => {
    try {
      // Use FormData if profile picture is provided
      if (profilePicture) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        if (data.job_title) formData.append("job_title", data.job_title);
        if (data.phone) formData.append("phone", data.phone);
        if (data.bio) formData.append("bio", data.bio);
        if (skills.length > 0) formData.append("skills", skills.join(", "));
        formData.append("profile_picture", profilePicture);

        if (isEditMode && id) {
          await updateMutation.mutateAsync({
            id,
            payload: formData,
            isFormData: true,
          });
        } else {
          await createMutation.mutateAsync({
            payload: formData,
            isFormData: true,
          });
        }
      } else {
        // Use regular JSON payload if no file
        const payload = {
          name: data.name,
          email: data.email,
          job_title: data.job_title || undefined,
          phone: data.phone || undefined,
          bio: data.bio || undefined,
          skills: skills.length > 0 ? skills.join(", ") : undefined,
        };

        if (isEditMode && id) {
          await updateMutation.mutateAsync({ id, payload });
        } else {
          await createMutation.mutateAsync({ payload });
        }
      }
      navigate(ROUTES.staffList.path);
    } catch (error) {
      console.error("Error saving staff:", error);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isEditMode ? "Edit Employee" : "Add Employee"}
        subtitle={
          isEditMode
            ? "Update the professional profile information"
            : "Create a new professional profile for the GISCON technical directory."
        }
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Profile Photo */}
          <div className="w-full h-fit lg:w-80 bg-bg-white border border-border rounded-lg p-6">
            <Label>Profile Photo</Label>
            <div className="mt-4 flex flex-col items-center">
              <Avatar src={profilePicturePreview} alt="Profile" size="xl" />
              <input
                type="file"
                id="profile-picture"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="profile-picture"
                className={`mt-4 flex items-center gap-2 px-4 py-2 border text-sm font-medium rounded-md hover:bg-bg-input transition-colors w-full justify-center cursor-pointer`}
              >
                <CustomIcon
                  IconComponent={Gallery}
                  color="text-text-secondary"
                  size={18}
                />
                Upload Photo
              </label>
              <p className="text-xs text-text-secondary text-center mt-3">
                PNG, JPG or WebP (max. 5MB). High-resolution photos are
                recommended.
              </p>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="flex flex-col flex-1 gap-3">
            {/* Basic Information */}
            <div className="bg-bg-white border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppInput
                  variant="primary"
                  label="Full Name"
                  {...register("name")}
                  placeholder="e.g. Alexander Mitchell"
                  hasError={!!errors.name?.message}
                  helperText={errors.name?.message}
                />

                <AppInput
                  variant="primary"
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  placeholder="alexander.m@giscon.tech"
                  hasError={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              </div>
              <div className="mt-4">
                <AppInput
                  variant="primary"
                  label="Job Title"
                  {...register("job_title")}
                  placeholder="e.g. Senior Full Stack Developer"
                  hasError={!!errors.job_title?.message}
                  helperText={errors.job_title?.message}
                />
              </div>
              <div className="mt-4">
                <AppInput
                  variant="primary"
                  label="Phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+1234567890"
                  hasError={!!errors.phone?.message}
                  helperText={errors.phone?.message}
                />
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-bg-white border border-border rounded-lg p-6">
              <Label className="text-text-secondary text-xs font-semibold">
                Professional Summary
              </Label>
              <textarea
                {...register("bio")}
                placeholder="Brief overview of technical expertise and career highlights..."
                className="mt-1 w-full min-h-30 px-4 py-3 bg-bg-white border border-border text-text-primary placeholder:text-text-secondary rounded-md text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                rows={4}
              />
              {errors.bio && (
                <p className="text-xs text-error mt-1">{errors.bio.message}</p>
              )}
            </div>

            {/* Technical Skills */}
            <div className="bg-bg-white border border-border rounded-lg p-6">
              <Label className="text-text-secondary text-xs font-semibold">
                Technical Skills
              </Label>
              <div className="mt-1 flex flex-wrap gap-2 min-h-10 p-3 bg-bg-white border border-border rounded-md">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
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
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.currentTarget.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type and press enter..."
                  className="flex-1 px-4 py-2 bg-bg-white border border-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                />
                <Button
                  type="button"
                  variant="primary"
                  icon={<CustomIcon IconComponent={Add} size={18} />}
                  onClick={handleAddSkill}
                  className="w-full sm:w-auto"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(ROUTES.staffList.path)}
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
                {isEditMode ? "Update Employee" : "Save Employee"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StaffForm;
