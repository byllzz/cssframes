import React, { useState, useMemo } from 'react';
import AnimationCard from '../layout/AnimationCard';
import SearchNavigation from './SearchNavigation';
import PreviewType from './PreviewType';
import FilterDropdown from './FilterDropdown';
import { Columns, LayoutGrid, ChevronLeft, ChevronRight, Box, Type, Circle, Star } from 'lucide-react';

export default function GridContent({
  animations,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onCardClick,
  previewType,
  setPreviewType,
}) {
  // memo filtering
  const filteredPlates = useMemo(() => {
    return animations.filter(plate => {
      const matchesSearch = plate.title.toLowerCase().includes(searchQuery.toLowerCase());
      const itemCategory = plate.category || plate.type;
      return matchesSearch && (selectedCategory === 'All' || itemCategory === selectedCategory);
    });
  }, [animations, searchQuery, selectedCategory]);

  // pagin state
  const [currentPage, setCurrentPage] = useState(1);
  const [gridPattern, setGridPattern] = useState('grid');
  const cardsPerPage = 12; // mult of 4/3/2/1

  // slice calc
  const totalPages = Math.ceil(filteredPlates.length / cardsPerPage);
  const currentCards = filteredPlates.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  // page helper
  const paginate = (num) => {
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
    <div className="flex-1 min-h-screen bg-[#050505] font-outfit pb-10">
      <div id="grid-top" className="scroll-mt-24" />

      {/* header */}
      <header className="px-4 md:pl-2 pr-4 pb-4">
        <h1 className="text-3xl md:text-[31px] text-zinc-100 font-heading font-bold tracking-tight">
          Browse all
        </h1>
        <p className="text-zinc-500 text-lg mt-1">Open-Source CSS animations library</p>
      </header>

      {/* toolbar */}
      <div className="sticky top-0 z-20 bg-[#050505]/80 backdrop-blur-md px-4 md:pl-2 pr-4 py-4 mb-8 border-b border-zinc-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-zinc-400 text-sm font-medium whitespace-nowrap">
              Page {currentPage} of {totalPages || 1}
            </h2>
            <div className="h-4 w-px bg-zinc-800" />
            <SearchNavigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <div className="flex items-center gap-4 self-end lg:self-auto">
            {/* desktop tool */}
            <div className="hidden md:flex items-center gap-4">
              <PreviewType
                previewType={previewType}
                setPreviewType={setPreviewType}
                previewOptions={previewOptions}
              />
              <div className="h-4 w-px bg-[#161616]" />
              <div className="flex bg-zinc-800/50 p-1 rounded-[5px] border-zinc-800">
                {[
                  { id: 'grid', icon: <LayoutGrid size={18} /> },
                  { id: 'columns', icon: <Columns size={18} /> },
                ].map(btn => (
                  <button
                    key={btn.id}
                    onClick={() => setGridPattern(btn.id)}
                    className={`p-1.5 rounded-[5px] transition-all cursor-pointer ${gridPattern === btn.id ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* mob tool */}
            <div className="md:hidden">
              <FilterDropdown previewOptions={previewOptions} previewType={previewType} setPreviewType={setPreviewType} />
            </div>
          </div>
        </div>
      </div>

      {/* grid main */}
      <main
        className={`px-4 md:pl-2 pr-4 transition-all duration-300 ${
          gridPattern === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'flex flex-col gap-4 max-w-4xl mx-auto'
        }`}
      >
        {currentCards.length > 0 ? (
          currentCards.map(anim => (
            <AnimationCard
              key={anim.id}
              animation={anim}
              onCardClick={onCardClick}
              previewType={previewType}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-zinc-600 italic">No matches found for "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* pagin btns */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-16 px-6">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="p-2.5 rounded-[5px] bg-zinc-900 border border-zinc-800 text-zinc-400 disabled:opacity-20 hover:bg-zinc-800 transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`min-w-[40px] h-10 rounded-[5px] text-sm font-semibold transition-all ${
                  currentPage === i + 1
                    ? 'bg-white text-black scale-105 shadow-lg'
                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 disabled:opacity-20 hover:bg-zinc-800 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      )}
    </div>
  );
}
