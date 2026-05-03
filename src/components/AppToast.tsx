import { TickSquare } from "iconsax-react";
import { useMemo } from "react";
import CustomIcon from "./icons/CustomIcon";
import { Button } from "./ui/Button";

const AppToast: React.FC<AppToastProps> = ({
  title,
  subtitle,
  variant = "success",
  footerTitle,
  footerSubtitle,
  onClose,
  className,
}) => {
  const variantStyles = useMemo(() => {
    switch (variant) {
      case "error":
        return {
          icon: "X",
          borderColor: "border-error",
          bgColor: "bg-error-50",
          iconBgColor: "bg-error",
          titleColor: "text-error-700",
          subtitleColor: "text-error-700",
        };
      case "success":
      default:
        return {
          icon: TickSquare,
          borderColor: "border-success",
          bgColor: "bg-success-50",
          iconBgColor: "bg-success",
          titleColor: "text-success-700",
          subtitleColor: "text-success-700",
        };
    }
  }, [variant]);

  return (
    <div
      className={`flex gap-2 items-start rounded-lg p-3 border text-sm w-96 max-w-120 ${variantStyles.borderColor} ${variantStyles.bgColor} ${className ?? ""}`}
    >
      {/* Icon */}
      {variantStyles.icon && (
        <div
          className={`w-5 h-5 flex items-center justify-center rounded-full ${variantStyles.iconBgColor} text-on-primary shrink-0 mt-0.5`}
        >
          {typeof variantStyles.icon === "string" ? (
            <span className="text-xs text-text-white font-bold">
              {variantStyles.icon}
            </span>
          ) : (
            <CustomIcon IconComponent={variantStyles.icon} />
          )}
        </div>
      )}

      <div className="flex justify-between w-full items-start gap-2">
        {/* Content */}
        <div className="flex flex-col items-start text-start gap-1 flex-1">
          <p className={`text-base font-semibold ${variantStyles.titleColor}`}>
            {title}
          </p>
          <p className={`text-sm ${variantStyles.subtitleColor}`}>{subtitle}</p>

          {footerTitle && (
            <div className="mt-3">
              <p className="font-semibold text-sm">{footerTitle}</p>
              <p
                className={`font-semibold text-sm ${variantStyles.titleColor}`}
              >
                {footerSubtitle}
              </p>
            </div>
          )}
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          aria-label="Close"
          className="p-0 hover:bg-transparent bg-transparent h-fit w-fit"
          onClick={onClose}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default AppToast;

export interface AppToastProps {
  title: string;
  subtitle: string;
  variant?: "success" | "info" | "warning" | "error";
  footerTitle?: string;
  footerSubtitle?: string;
  onClose?: () => void;
  className?: string;
}
