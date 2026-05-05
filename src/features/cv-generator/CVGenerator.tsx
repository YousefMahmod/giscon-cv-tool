import { useState } from "react";
import { PageHeader, Button } from "@app/components";
import { ArrowLeft, ArrowRight, DocumentDownload } from "iconsax-react";
import CustomIcon from "@app/components/icons/CustomIcon";
import StaffSelector from "./components/StaffSelector";
import Stepper from "./components/Stepper";
import ProjectSelector from "./components/ProjectSelector";
import TemplateSelector from "./components/TemplateSelector";
import useDownloadCV from "./hooks/useDownloadCV";
import { showToast } from "@app/utils/toasts";
import type { StaffWithProjectsApiResponse } from "../participation/participation.types";
import { STEPS } from "./cv.constants";
import type { CVGeneratorState } from "./cv.types";

const CVGenerator = () => {
  const [state, setState] = useState<CVGeneratorState>({
    selectedStaff: null,
    selectedProjects: [],
    selectedTemplate: null,
    currentStep: 1,
  });

  const { mutate: downloadCV, isPending: isDownloading } = useDownloadCV();

  const handleStaffSelect = (staff: StaffWithProjectsApiResponse | null) => {
    setState((prev) => ({
      ...prev,
      selectedStaff: staff,
      selectedProjects: [],
    }));
  };

  const handleProjectToggle = (projectId: number) => {
    setState((prev) => ({
      ...prev,
      selectedProjects: prev.selectedProjects.includes(projectId)
        ? prev.selectedProjects.filter((id) => id !== projectId)
        : [...prev.selectedProjects, projectId],
    }));
  };

  const handleTemplateSelect = (templateName: string) => {
    setState((prev) => ({ ...prev, selectedTemplate: templateName }));
  };

  const handleNext = () => {
    if (state.currentStep < STEPS.length) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const handleBack = () => {
    if (state.currentStep > 1) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleDownload = () => {
    if (!state.selectedStaff || !state.selectedTemplate) {
      showToast({
        title: "Missing Information",
        subtitle: "Please select staff and template",
        variant: "error",
      });
      return;
    }

    if (state.selectedProjects.length === 0) {
      showToast({
        title: "No Projects Selected",
        subtitle: "Please select at least one project",
        variant: "error",
      });
      return;
    }

    downloadCV({
      staffId: state.selectedStaff.staff_id,
      payload: {
        template_name: state.selectedTemplate,
        project_ids: state.selectedProjects.join(","),
      },
      staffName: state.selectedStaff.staff_name,
    });
  };

  const canProceed = () => {
    switch (state.currentStep) {
      case 1:
        return state.selectedStaff !== null;
      case 2:
        return state.selectedProjects.length > 0;
      case 3:
        return state.selectedTemplate !== null;
      default:
        return false;
    }
  };

  return (
    <>
      <PageHeader
        title="CV Generator"
        subtitle="Generate and download professional CVs in 3 simple steps."
        hideBackButton
      />

      <div className="bg-bg-white border border-border rounded-lg p-8">
        {/* Stepper */}
        <Stepper
          steps={STEPS.map((s) => ({ id: s.number, label: s.title }))}
          currentStep={state.currentStep}
        />

        {/* Step Content */}
        <div className="min-h-96">
          {/* Step 1: Select Staff */}
          {state.currentStep === 1 && (
            <StaffSelector
              selectedStaff={state.selectedStaff}
              onSelect={handleStaffSelect}
            />
          )}

          {/* Step 2: Select Projects */}
          {state.currentStep === 2 && state.selectedStaff && (
            <ProjectSelector
              projects={state.selectedStaff.projects}
              selectedProjects={state.selectedProjects}
              onToggle={handleProjectToggle}
            />
          )}

          {/* Step 3: Choose Template */}
          {state.currentStep === 3 && (
            <TemplateSelector
              selectedTemplate={state.selectedTemplate}
              onSelect={handleTemplateSelect}
              step={state.currentStep}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            title="Back"
            icon={
              <CustomIcon IconComponent={ArrowLeft} color="text-text-primary" />
            }
            onClick={handleBack}
            variant="outline"
            disabled={state.currentStep === 1 || isDownloading}
          />

          {state.currentStep < STEPS.length ? (
            <Button
              title="Next"
              icon={
                <CustomIcon
                  IconComponent={ArrowRight}
                  color="text-text-white"
                />
              }
              iconPosition="right"
              onClick={handleNext}
              disabled={!canProceed()}
            />
          ) : (
            <Button
              title={"Download CV"}
              icon={
                <CustomIcon
                  IconComponent={DocumentDownload}
                  color="text-text-white"
                />
              }
              iconPosition="right"
              onClick={handleDownload}
              disabled={!canProceed() || isDownloading}
              loading={isDownloading}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CVGenerator;
