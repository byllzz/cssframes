import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 2;

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="mt-20 px-4 font-outfit">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6">

        {/* Main Bar */}
        <div className="flex items-center gap-3 bg-[#0c0c0c] border border-white/[0.06] rounded-full px-4 py-2 shadow-lg">

          {/* Prev */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-1.5 text-sm text-zinc-500 hover:text-white transition disabled:opacity-20"
          >
            Prev
          </button>

          {/* Page Pills */}
          <div className="flex items-center gap-1 relative">

            {/* Active background slider */}
            <div
              className="absolute h-8 bg-white rounded-full transition-all duration-300 ease-out"
              style={{
                width: '40px',
                transform: `translateX(${(pages.indexOf(currentPage)) * 44}px)`
              }}
            />

            {pages.map((p, index) => {
              if (p === '...') {
                return (
                  <span key={index} className="w-10 text-center text-zinc-600 text-sm">
                    ...
                  </span>
                );
              }

              const isActive = currentPage === p;

              return (
                <button
                  key={p}
                  onClick={() => paginate(p)}
                  className={`
                    relative z-10 w-10 h-8 text-sm font-medium rounded-full transition
                    ${
                      isActive
                        ? 'text-black'
                        : 'text-zinc-500 hover:text-white'
                    }
                  `}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* Next */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-1.5 text-sm text-zinc-500 hover:text-white transition disabled:opacity-20"
          >
            Next
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-500">
          Page <span className="text-white font-medium">{currentPage}</span> of{' '}
          <span className="text-zinc-400">{totalPages}</span>
        </p>

      </div>
    </div>
  );
};

export default Pagination;
