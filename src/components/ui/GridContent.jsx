import React, { useState, useMemo , useEffect } from 'react';
import AnimationCard from '../layout/AnimationCard';
import SearchNavigation from './SearchNavigation';
import PreviewType from './PreviewType';
import FilterDropdown from './FilterDropdown';
import Pagination from './Pagination'
import {
  Columns,
  LayoutGrid,

  Box,
  Type,
  Circle,
  Star,
  SearchX,
} from 'lucide-react';

export default function GridContent({
  animations,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onCardClick,
  previewType,
  setPreviewType,
  onShareClick,
}) {
  // state mangament
  const [currentPage, setCurrentPage] = useState(1);
  const [gridPattern, setGridPattern] = useState('grid');
  const cardsPerPage = 25;

  // filter logic
  const filteredPlates = useMemo(() => {
    return animations.filter(plate => {
      const matchesSearch = plate.title.toLowerCase().includes(searchQuery.toLowerCase());
      const itemCategory = plate.category || plate.type;
      return matchesSearch && (selectedCategory === 'All' || itemCategory === selectedCategory);
    });
  }, [animations, searchQuery, selectedCategory]);

  //  reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // pagination calculations
  const totalPages = Math.ceil(filteredPlates.length / cardsPerPage);

  const currentCards = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return filteredPlates.slice(start, start + cardsPerPage);
  }, [filteredPlates, currentPage]);

  const paginate = num => {
    setCurrentPage(num);
    document.getElementById('grid-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  const previewOptions = [
    { id: 'box', label: 'Box', icon: <Box size={16} /> },
    { id: 'text', label: 'Text', icon: <Type size={14} /> },
    { id: 'circle', label: 'Circle', icon: <Circle size={14} /> },
    { id: 'icon', label: 'Icon', icon: <Star size={14} /> },
  ];

  return (
    <div className="flex-1 min-h-screen  font-outfit pb-20">
      <div className='relative bottom-[24px]'>
        {/* <div id="grid-top" className="scroll-mt-32" /> */}
        {/* header */}
        <header className="px-6 md:px-2 pt-13">
          <h1 className="text-4xl md:text-4xl font-bold text-white/90 tracking-normal leading-none mb-2">
            {selectedCategory === 'All' ? 'Browse all' : selectedCategory}{' '}
          </h1>
          <p className="text-zinc-500 text-md max-w-[400px] leading-tight">
            CSS animations designed for ultra-sleek interfaces.
          </p>
        </header>

        {/* toolbar */}
        <div className="bg-[#050505]/60 backdrop-blur-xl px-6 md:px-2 py-5 relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            {/* Search */}
            <div className="flex items-center gap-6 w-[50%]">
              <SearchNavigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <div className="hidden sm:block h-6 w-px bg-zinc-800" />
              <div className="hidden sm:flex flex-col">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">
                  Results
                </span>
                <p className="text-[12px] font-bold text-zinc-400">
                  {currentCards.length} of {filteredPlates.length} Units
                </p>
              </div>
            </div>

            {/* View & Preview Controls */}
            <div className="flex items-center gap-5 self-end lg:self-auto">
              <div className="hidden md:flex items-center gap-6 ">
                <PreviewType
                  previewType={previewType}
                  setPreviewType={setPreviewType}
                  previewOptions={previewOptions}
                />

                <div className="h-4 w-px bg-zinc-800" />

                {/* Grid Pattern Toggle */}
                <div className="flex bg-zinc-900/50 p-1 rounded-[5px] border border-white/[0.05]">
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

              {/* Mobile Filter */}
              <div className="block md:hidden z-9999 relative top-3">
                <FilterDropdown
                  previewOptions={previewOptions}
                  previewType={previewType}
                  setPreviewType={setPreviewType}
                />
              </div>
            </div>
          </div>
        </div>

        {/* grid content */}
        <main
          className={`px-3 md:px-2 transition-all duration-500 ${
            gridPattern === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
              : 'flex flex-col gap-6 max-w-5xl mx-auto'
          }`}
        >
          {currentCards.length > 0 ? (
            currentCards.map(anim => (
              <AnimationCard
                key={anim.id}
                animation={anim}
                onCardClick={onCardClick}
                previewType={previewType}
                onShareClick={onShareClick}
              />
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full py-32 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-[40px] bg-zinc-900/10">
              <SearchX size={48} className="text-zinc-800 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Null Results</h3>
              <p className="text-zinc-500 text-sm italic">
                No animations matching "{searchQuery}" in {selectedCategory}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="mt-6 px-6 py-2 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
}
