import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null;

  const goPrev = () => paginate(currentPage - 1);
  const goNext = () => paginate(currentPage + 1);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="mt-20 px-4 font-outfit">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6">

        {/* Button Container */}
        <div
          className={`
            flex items-center gap-3 transition-all duration-300
            ${isFirst || isLast ? 'w-1/2 justify-center' : 'w-full justify-between'}
          `}
        >

          {/* Prev (only show if not first page) */}
          {!isFirst && (
            <button
              onClick={goPrev}
              className="
                flex-1 py-3 rounded-full text-sm font-semibold
                bg-zinc-900 text-white border border-white/10
                hover:bg-zinc-800 transition
              "
            >
              Previous
            </button>
          )}

          {/* Next (only show if not last page) */}
          {!isLast && (
            <button
              onClick={goNext}
              className="
                flex-1 py-3 rounded-full text-sm font-semibold
                bg-white text-black hover:scale-[1.02] active:scale-[0.98]
                transition
              "
            >
              Next
            </button>
          )}

        </div>

        {/* Page indicator */}
        <p className="text-xs text-zinc-500">
          Page <span className="text-white font-medium">{currentPage}</span> of{' '}
          <span className="text-zinc-400">{totalPages}</span>
        </p>

      </div>
    </div>
  );
};

export default Pagination;
