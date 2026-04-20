import React, { useState, useMemo, useEffect, useRef } from 'react';
import AnimationCard from '../layout/AnimationCard';
import Toolbar from './Toolbar';
import Pagination from './Pagination';
import { Box, Type, Circle, Star, SearchX } from 'lucide-react';
import EmptyState from './EmptyState';


 // Configuration
 const previewOptions = [
   { id: 'box', label: 'Box', icon: <Box size={16} /> },
   { id: 'text', label: 'Text', icon: <Type size={14} /> },
   { id: 'circle', label: 'Circle', icon: <Circle size={14} /> },
   { id: 'icon', label: 'Icon', icon: <Star size={14} /> },
 ];

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
  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [gridPattern, setGridPattern] = useState('grid');
  const cardsPerPage = 24; // Multiples of 2, 3, and 4 work best for responsive grids

  // Ref
  const gridTopRef = useRef(null);

  // Filter Logic
  const filteredPlates = useMemo(() => {
    return animations.filter(plate => {
      const matchesSearch = plate.title.toLowerCase().includes(searchQuery.toLowerCase());
      const itemCategory = plate.category || plate.type;
      return matchesSearch && (selectedCategory === 'All' || itemCategory === selectedCategory);
    });
  }, [animations, searchQuery, selectedCategory]);

  // Reset to first page whenever user searches or changes category
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPlates.length / cardsPerPage);

  const currentCards = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return filteredPlates.slice(start, start + cardsPerPage);
  }, [filteredPlates, currentPage]);

  const paginate = (num) => {
  if (num < 1 || num > totalPages) return;
  setCurrentPage(num);
  gridTopRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};



  return (
    <div className="flex-1 min-h-screen font-outfit pb-20">
      <div ref={gridTopRef} className="scroll-mt-28" />

      <div className="relative -mt-6">
        {/* Header Section */}
        <header className="px-4 md:px-2 pt-14">
          <h1 className="text-3xl md:text-3xl font-bold font-heading text-white/90 tracking-tight leading-none mb-3">
            {selectedCategory === 'All' ? 'Browse all' : selectedCategory}
          </h1>
          <p className="text-white/60 text-[16px] font-medium max-w-[550px] leading-5">
            Open-Source animations library using pure CSS keyframes.
          </p>
        </header>

        {/* Toolbar Section */}
        <Toolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentCards={currentCards}
          filteredPlates={filteredPlates}
          previewType={previewType}
          setPreviewType={setPreviewType}
          previewOptions={previewOptions}
          gridPattern={gridPattern}
          setGridPattern={setGridPattern}
        />

        {/* Main Grid Content */}
        <main
          className={`px-3 md:px-2 transition-all duration-500  ${
            gridPattern === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
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
           <EmptyState searchQuery={searchQuery} selectedCategory={selectedCategory} setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage}  />
          )}
        </main>
      </div>

      {/* Pagination Footer */}
      <div className="mt-16">
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      </div>
    </div>
  );
}
