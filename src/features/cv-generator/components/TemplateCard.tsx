import CustomIcon from "@app/components/icons/CustomIcon";
import { FaCheck } from "react-icons/fa";
import type { TemplateApiResponse } from "../cv.types";

interface TemplateCardProps {
  template: TemplateApiResponse;
  isSelected: boolean;
  onClick: () => void;
}

const TemplateCard = ({ template, isSelected, onClick }: TemplateCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 ${
        isSelected
          ? "border-primary shadow-lg"
          : "border-border hover:border-primary/50"
      }`}
    >
      <div className="bg-bg-input relative">
        {template.img ? (
          <img
            src={template.img}
            alt={template.title}
            className="w-full h-auto border border-gray-100 transition-transform duration-300 group-hover:scale-[1.02]"
            style={{ aspectRatio: "1 / 1.414" }}
          />
        ) : (
          // </div>
          <div className="w-full h-full flex items-center justify-center text-text-secondary">
            <span className="text-4xl">📄</span>
          </div>
        )}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-primary rounded-full p-1 shadow-lg animate-in zoom-in duration-200">
            <CustomIcon
              IconComponent={FaCheck}
              size={16}
              color="text-text-white"
              variant="bold"
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
          {template.title}
        </h4>
        <p className="text-sm text-text-secondary">{template.subtitle}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
