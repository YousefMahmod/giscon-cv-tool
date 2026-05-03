import React from "react";

interface Props {
  colCount?: number;
}

const SkeletonRow: React.FC<Props> = ({ colCount = 4 }) => {
  const cols = Array.from({ length: colCount });

  return (
    <>
      {cols.map((_, idx) => (
        <td key={idx} className="px-6 py-4">
          <div className="h-4 rounded bg-bg-input/90 animate-pulse w-3/4" />
        </td>
      ))}
    </>
  );
};

export default SkeletonRow;
