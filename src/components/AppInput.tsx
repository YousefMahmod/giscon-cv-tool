import { type CSSProperties, forwardRef } from "react";
import { cn } from "@app/utils/style";
import { Label } from "./ui/label";
import { Input, type InputProps } from "./ui/Input";

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      hasError,
      helperText,
      className,
      containerClassName,
      inputContainerStyles,
      inputContainerClassName,
      leftIcon,
      rightIcon,
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("flex flex-col gap-1 w-full", containerClassName)}>
        {label && (
          <Label className="text-text-secondary text-xs font-semibold">
            {label}
          </Label>
        )}
        <div style={inputContainerStyles} className={inputContainerClassName}>
          <Input
            ref={ref}
            hasError={hasError}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            variant={variant}
            className={className}
            {...props}
          />
        </div>
        {helperText && (
          <p
            className={cn("text-xs text-text-secondary", {
              "text-error": hasError,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

AppInput.displayName = "AppInput";

export default AppInput;

export interface AppInputProps extends InputProps {
  label?: string;
  helperText?: string;
  containerClassName?: string;
  inputContainerStyles?: CSSProperties | undefined;
  inputContainerClassName?: string;
}
