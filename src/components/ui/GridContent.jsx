import React, { useState } from 'react';
import AnimationCard from '../layout/AnimationCard';
import SearchNavigation from './SearchNavigation';
import { Columns, Home, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import PreviewType from './PreviewType';

export default function GridContent({
  animations,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onCardClick,
  previewType,
  setPreviewType,
}) {
  //  for filtering
  const filteredPlates = animations.filter(plate => {
    const matchesSearch = plate.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || plate.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // for pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  // Calculating Slicing
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredPlates.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredPlates.length / cardsPerPage);

  const [gridPattern, setGridPattern] = useState('grid');

  const gridPatternsBtns = [
    { id: 'columns', icon: <Columns size={18} />, title: 'Columns View' },
    { id: 'grid', icon: <LayoutGrid size={18} />, title: 'Grid View' },
  ];

  // Helper  to change page and scroll back to top of grid
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    document.getElementById('grid-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden bg-[#050505] py-6 font-outfit">
      <div id="grid-top" /> {/* Scroll anchor */}
      {/* Header  */}
      <header className="flex flex-col gap-5 items-start border-b border-zinc-900 px-8 pb-4 mb-8 ">
        <div className="flex items-center gap-1 text-white ">
          <Home size={18} /> <span>Home</span>
        </div>
      </header>
      <div className="flex flex-col w-full items-start px-4  md:px-7 mb-5">
        <h1 className="text-3xl text-white font-heading font-bold">Browse all</h1>
        <p className="text-zinc-500 text-[18px] font-outfit ">Open-Source CSS animations library</p>
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between w-full relative right-2 px-9 mb-5 ">
        <h2 className="text-white/70 text-md font-heading font-medium">
          Page {currentPage} of {totalPages || 1}
        </h2>

        <div className="text-white flex items-center gap-2 ">
          <div className="h-5 w-[2px] bg-zinc-800"></div>
          <PreviewType previewType={previewType} setPreviewType={setPreviewType} />
          <div className="h-5 w-[2px] bg-zinc-800"></div>
          {/* grid pattern btns */}
          <div className="flex items-center gap-2">
            {gridPatternsBtns.map(btn => (
              <button
                key={btn.id}
                className={`${gridPattern === btn.id ? 'bg-indigo-800 text-white p-2 rounded-[5px]' : 'text-zinc-500 p-2'} cursor-pointer hover:text-white transition-colors`}
                onClick={() => setGridPattern(btn.id)}
              >
                {btn.icon}
              </button>
            ))}
          </div>
          <SearchNavigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      {/* Grid Layout */}
      <div
        className={`grid gap-6 px-5 md:px-6 mb-12 ${gridPattern === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}
      >
        {currentCards.length > 0 ? (
          currentCards.map(animation => (
            <AnimationCard
              key={animation.id}
              animation={animation}
              onCardClick={onCardClick}
              previewType={previewType}
            />
          ))
        ) : (
          <p className="text-zinc-500 col-span-3 text-center py-10">
            No animations found matching "{searchQuery}"
          </p>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pb-20">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                  currentPage === i + 1
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
