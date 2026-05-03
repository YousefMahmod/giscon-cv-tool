import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-text-secondary">
        Showing {startItem}-{endItem} of {totalItems}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-border hover:bg-bg-input transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft2 size={16} color="#666666" />
        </button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {[...Array(Math.min(totalPages, 5))].map((_, index) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = index + 1;
            } else if (currentPage <= 3) {
              pageNum = index + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + index;
            } else {
              pageNum = currentPage - 2 + index;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentPage === pageNum
                    ? "bg-primary text-on-primary"
                    : "border border-border hover:bg-bg-input text-text-primary"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="px-2 text-text-secondary">...</span>
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 rounded-md text-sm font-medium border border-border hover:bg-bg-input text-text-primary transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-border hover:bg-bg-input transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight2 size={16} color="#666666" />
        </button>
      </div>
    </div>
  );
}
