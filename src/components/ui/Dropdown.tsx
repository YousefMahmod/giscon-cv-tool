import { ArrowDown2 } from "iconsax-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@app/utils/style";
import CustomIcon from "../icons/CustomIcon";

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  hasError?: boolean;
  helperText?: string;
  searchable?: boolean;
}

export default function Dropdown({
  label,
  placeholder = "Select an option...",
  options,
  value,
  onChange,
  disabled = false,
  hasError = false,
  helperText,
  searchable = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
          {label}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full px-4 py-3 text-left bg-bg-white border rounded-md text-sm transition-colors flex items-center justify-between",
            {
              "border-primary": isOpen && !hasError,
              "border-border": !isOpen && !hasError,
              "border-error": hasError,
              "opacity-50 cursor-not-allowed": disabled,
              "cursor-pointer hover:border-primary": !disabled,
            },
          )}
        >
          <span
            className={cn("truncate", {
              "text-text-secondary": !selectedOption,
              "text-text-primary": selectedOption,
            })}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <CustomIcon
            IconComponent={ArrowDown2}
            size={16}
            color="text-text-secondary"
            className={cn("transition-transform", {
              "rotate-180": isOpen,
            })}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-bg-white border border-border rounded-md shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-border">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:border-primary"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-text-secondary text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-sm hover:bg-bg-input transition-colors",
                      {
                        "bg-primary/10 text-primary font-medium":
                          option.value === value,
                        "text-text-primary": option.value !== value,
                      },
                    )}
                  >
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {helperText && (
        <p
          className={cn("text-xs mt-1", {
            "text-error": hasError,
            "text-text-secondary": !hasError,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
