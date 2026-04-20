import React from 'react';
import { LayoutGrid, Columns } from 'lucide-react';
import PreviewType from './PreviewType';
import SearchNavigation from './SearchNavigation';

const Toolbar = ({
  searchQuery,
  setSearchQuery,
  currentCards,
  filteredPlates,
  previewType,
  setPreviewType,
  previewOptions,
  gridPattern,
  setGridPattern
}) => {
  return (
    <div className="bg-[#050505]/60 backdrop-blur-xl px-4 sm:px-6 md:px-2 py-4 sm:py-5 relative">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        {/* Search & Results Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full lg:w-[50%]">
          <div className="w-full sm:flex-1">
            <SearchNavigation
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="h-6 w-px bg-zinc-800" />

            <div className="flex flex-col">
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">
                Results
              </span>
              <p className="text-[12px] font-bold text-zinc-400 whitespace-nowrap">
                {currentCards.length} of {filteredPlates.length} Units
              </p>
            </div>
          </div>
        </div>

        {/* Controls Section (Preview & Grid) */}
        <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-5 border-t border-white/5 pt-3 sm:border-t-0 sm:pt-0">
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-start">
            <PreviewType
              previewType={previewType}
              setPreviewType={setPreviewType}
              previewOptions={previewOptions}
            />

            <div className="h-4 w-px bg-zinc-800" />

            {/* Grid Toggle */}
            <div className="flex bg-zinc-900/50 p-1 rounded-[5px] border border-white/[0.05] w-fit">
              {[
                { id: 'grid', icon: <LayoutGrid size={16} /> },
                { id: 'columns', icon: <Columns size={16} /> },
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => setGridPattern(btn.id)}
                  className={`p-2 rounded-[5px] transition-all cursor-pointer ${
                    gridPattern === btn.id
                      ? 'bg-white text-black shadow-xl'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
