import TemplateCard from "./TemplateCard";
import useTemplates from "../hooks/useTemplates";
import type { TemplateApiResponse } from "../cv.types";
import { STEPS } from "../cv.constants";

interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelect: (templateName: string) => void;
  step: number;
}

const TemplateSelector = ({
  selectedTemplate,
  onSelect,
  step,
}: TemplateSelectorProps) => {
  const { data: templates, isLoading } = useTemplates(step === STEPS.length);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-sm font-semibold text-text-secondary uppercase mb-2">
          Choose CV Template
        </h3>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading templates...</p>
        </div>
      ) : templates && templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((template: TemplateApiResponse) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.template_name}
              onClick={() => onSelect(template.template_name)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-secondary">No templates available</p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
