import React from 'react';
import { FaArrowRight ,FaArrowLeft } from 'react-icons/fa6';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null;

  const goPrev = () => paginate(currentPage - 1);
  const goNext = () => paginate(currentPage + 1);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="mt-20 px-4 font-outfit">
      <div className="max-w-full mx-auto flex flex-col items-center gap-6">
        {/* Button Container */}
        <div
          className={`
            flex items-center gap-3 transition-all duration-300 w-full
            ${isFirst || isLast ? ' justify-end' : ' justify-start '}
          `}
        >
          {/* Prev (only show if not first page) */}
          {!isFirst && (
            <button
              onClick={goPrev}
              className="
                flex w-1/2 py-6 px-5 rounded-[8px] text-xl font-semibold
                bg-zinc-900 justify-start text-white items-center gap-2
              "
            >
              <FaArrowLeft /> Previous
            </button>
          )}

          {/* Next (only show if not last page) */}
          {!isLast && (
            <button
              onClick={goNext}
              className="
                flex justify-end px-5 py-6 w-1/2 rounded-[8px] text-xl font-semibold
                bg-white text-black items-center gap-2
              "
            >
              Next <FaArrowRight />
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
