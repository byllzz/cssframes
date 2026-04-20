import { SearchX } from 'lucide-react';

export default function EmptyState({
  searchQuery,
  selectedCategory,
  setSearchQuery,
  setCurrentPage,
}) {
  return (
    <div className="col-span-full py-25 flex flex-col items-center justify-center relative overflow-hidden rounded-[32px] border border-white/[0.04] bg-[#070707]">
      {/* Soft ambient depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="w-[240px] h-[240px] rounded-full bg-purple-500/[0.08] blur-2xl absolute" />
      </div>



      {/* Icon */}
      <div className="relative z-10 mb-5 p-4">
        <SearchX size={64} className="text-zinc-500" />
      </div>

      {/* Text */}
      <h3 className="relative z-10 text-2xl font-semibold text-white tracking-tight mb-2">
        No matches found
      </h3>

      <p className="relative z-10 text-zinc-500 text-sm max-w-sm text-center leading-relaxed">
        No results for <span className="text-white">"{searchQuery}"</span>
        {selectedCategory !== 'All' && (
          <>
            {' '}
            inside <span className="text-white">{selectedCategory}</span>
          </>
        )}
        . Try a different keyword or clear the filter.
      </p>

      {/* Action */}
      <button
        onClick={() => {
          setSearchQuery('');
          setCurrentPage(1);
        }}
        className="
          relative z-10 mt-8 px-7 py-3 rounded-[5px] text-xs font-semibold uppercase tracking-[0.22em]
          bg-white text-black active:scale-95
          transition-all duration-300 shadow-lg shadow-white/10
        "
      >
        Reset Search
      </button>

      {/* Small particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-1/4 w-1 h-1 rounded-full bg-white/20 animate-pulse" />
        <div className="absolute bottom-14 right-1/3 w-1.5 h-1.5 rounded-full bg-purple-400/25 animate-pulse" />
        <div className="absolute top-1/2 right-10 w-1 h-1 rounded-full bg-white/10 animate-bounce" />
      </div>
    </div>
  );
}
