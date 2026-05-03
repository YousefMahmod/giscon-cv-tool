import { type ReactNode } from "react";
import SkeletonRow from "../SkeletonRow";

interface Column {
  header: string;
  accessor?: string;
  className?: string;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T) => ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  keyExtractor: (item: T) => string;
}

export default function Table<T>({
  columns,
  data,
  renderRow,
  isLoading = false,
  emptyMessage = "No data found",
  keyExtractor,
}: TableProps<T>) {
  return (
    <div className="bg-bg-white border border-border rounded-lg overflow-hidden">
      <div className="w-full overflow-x-auto [&_td]:align-middle [&_th]:align-middle">
        <table className="w-full min-w-160 text-left border-collapse">
          <thead>
            <tr className="bg-bg-input border-b border-border">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-xs text-text-secondary uppercase tracking-wider font-semibold ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // render a few skeleton rows matching the column count
              Array.from({ length: 3 }).map((_, rIdx) => (
                <tr
                  key={`skeleton-${rIdx}`}
                  className="hover:bg-bg-input/50 transition-colors border-b border-border last:border-b-0"
                >
                  <SkeletonRow colCount={columns.length} />
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center">
                  <div className="text-text-secondary">{emptyMessage}</div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className="hover:bg-bg-input/50 transition-colors border-b border-border last:border-b-0"
                >
                  {renderRow(item)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
