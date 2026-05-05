import CustomIcon from "@app/components/icons/CustomIcon";
import { cn } from "@app/utils/style";
import { FaCheck } from "react-icons/fa";

interface Step {
  id: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id}
            className={cn("flex items-center", { "flex-1": !isLast })}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  isCompleted
                    ? "bg-primary text-white"
                    : isCurrent
                      ? "bg-primary text-white"
                      : "bg-bg-input text-text-secondary border border-border"
                }`}
              >
                {isCompleted ? (
                  <CustomIcon
                    IconComponent={FaCheck}
                    size={18}
                    color="text-text-white"
                    variant="bold"
                  />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrent ? "text-primary" : "text-text-secondary"
                }`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors ${
                  isCompleted ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
