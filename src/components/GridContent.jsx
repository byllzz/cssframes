import React, { useState } from 'react'
import AnimationCard from './AnimationCard'
import SearchNavigation from './SearchNavigation'
import { Columns,  Home, LayoutGrid, Box, Type, Circle, Star } from 'lucide-react';
import FilterDropdown from './FilterDropdown';


export default function GridContent({
  animations,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onCardClick,
  previewType,
  setPreviewType
}) {
  const filteredPlates = animations.filter(plate => {
    //  Check if matches search
    const matchesSearch = plate.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Check if matches category (If 'All' is selected, show everything)
    const matchesCategory =
      selectedCategory === 'All' || plate.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });



  const [gridPattern, setGridPattern] = useState("grid");

  const gridPatternsBtns = [
    { id : "columns", icon: <Columns size={18} />, title: "Colums View" },
    { id: "grid"  ,icon: <LayoutGrid size={18} />, title: "Grid View" }
  ];

   const previewOptions = [
     { id: 'box', label: 'Box', icon: <Box size={14} /> },
     { id: 'text', label: 'Text', icon: <Type size={14} /> },
     { id: 'circle', label: 'Circle', icon: <Circle size={14} /> },
     { id: 'icon', label: 'Icon', icon: <Star size={14} /> },
   ];

  return (
    <div className="flex-1 h-screen overflow-hidden bg-[#000] py-6  font-outfit">
      <header className="flex flex-col gap-5 items-start border-b border-zinc-800 px-8 pb-4 mb-8 ">
        <div className="flex items-center gap-1 text-white ">
          <Home size={18} /> <span>Home</span>
        </div>
      </header>
      {/* some heading */}
      <div className="flex flex-col w-full items-start px-8 mb-5">
        <h1 className="text-3xl text-white font-heading font-bold">Browse all</h1>
        <p className="text-zinc-500 text-[18px] font-outfit ">Open-Source CSS animations library</p>
      </div>
      {/* controls options */}
      <div className="flex items-center justify-between w-full relative right-2 px-10 mb-5 ">
        <h2 className="text-white/70 text-md font-heading font-medium">First Page</h2>
        <div className="text-white flex items-center gap-2 ">
          {/* divider */}
          <div className="h-7 w-[2px] bg-white/80"></div>
          {/* preview options */}
          <div className="flex flex-row items-center gap-2">
            {previewOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setPreviewType(opt.id)}
                className={`flex items-center gap-2 px-3 py-2 text-[11px] font-medium  transition-all cursor-pointer
                  ${
                    previewType === opt.id
                      ? 'bg-zinc-500 text-white border-zinc-100 shadow-lg rounded-[5px]'
                      : 'text-white'
                  }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
          <div className="h-7 w-[2px] bg-white/80"></div>

          {/* optional controls */}
          <FilterDropdown />
          <div className="h-7 w-[2px] bg-white/80"></div>
          {/* grid patterns */}
          <div className="flex items-center gap-2">
            {gridPatternsBtns.map(btn => (
              <button
                key={btn.id}
                className={`${gridPattern === btn.id ? 'bg-zinc-600 text-white p-2 rounded-[5px]' : 'text-white p-2'} cursor-pointer`}
                onClick={() => setGridPattern(btn.id)}
              >
                {btn.icon}
              </button>
            ))}
          </div>

          <SearchNavigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 h-145 overflow-y-auto">
        {filteredPlates.length > 0 ? (
          filteredPlates.map(animation => (
            <AnimationCard
              key={animation.id}
              animation={animation}
              onCardClick={onCardClick}
              previewType={previewType}
            />
          ))
        ) : (
          <p className="text-zinc-500 col-span-3 text-center py-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No animations found matching "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}
