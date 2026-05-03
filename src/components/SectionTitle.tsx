import React from "react";

const SectionTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-h1 font-bold text-text-primary">{title}</h1>
      {subtitle && (
        <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;

interface Props {
  title: string;
  subtitle?: string;
}
