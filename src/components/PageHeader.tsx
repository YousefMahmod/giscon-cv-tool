import { BackSquare } from "iconsax-react";
import CustomIcon from "./icons/CustomIcon";
import { navigateTo } from "@app/utils/navigation";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  hideBackButton?: boolean;
}

const PageHeader = ({
  title,
  subtitle,
  actions,
  hideBackButton,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {!hideBackButton && (
          <CustomIcon
            IconComponent={BackSquare}
            color="text-text-primary"
            size={32}
            onClick={() => navigateTo(-1)}
          />
        )}
        <div>
          <h1 className="text-xl sm:text-h1 font-bold text-text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {!!actions && actions}
    </div>
  );
};

export default PageHeader;
