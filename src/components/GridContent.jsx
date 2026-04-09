import React from 'react'
import AnimationCard from './AnimationCard'
import SearchNavigation from './SearchNavigation'
import { Columns, Filter, Grid, Home, Layers, LayoutGrid } from 'lucide-react';

export default function GridContent({ animations, searchQuery, setSearchQuery, selectedCategory, onCardClick }) {
  const filteredPlates = animations.filter(plate => {
    //  Check if matches search
    const matchesSearch = plate.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Check if matches category (If 'All' is selected, show everything)
    const matchesCategory =
      selectedCategory === 'All' || plate.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });



  return (
    <div className="flex-1 h-screen overflow-hidden bg-[#0f0f0f] py-6  font-outfit">
      <header className="flex flex-col gap-5 items-start border-b border-zinc-800 px-8 pb-4 mb-8 ">
        <div className="flex items-center gap-1 text-white ">
          <Home size={18} /> <span>Home</span>
        </div>
        <div className="flex items-center justify-between w-full relative right-2 ">
          <SearchNavigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="text-white flex items-center gap-2">
            <button className="flex items-center gap-2 bg-[#000] py-1.5 px-4 rounded-[10px] cursor-pointer">
              <Filter size={15} /> <span>Filters</span>{' '}
            </button>
            <div className="flex items-center gap-2 bg-[#000] py-2.5 px-4 rounded-[10px]">
              <button className="cursor-pointer">
                <Columns size={17} />
              </button>
              <div className='bg-[#ccc] h-4 w-[1px]'></div>
              <button className="cursor-pointer">
                <LayoutGrid size={17} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 h-145 overflow-y-auto">
        {filteredPlates.length > 0 ? (
          filteredPlates.map(animation => (
            <AnimationCard key={animation.id} animation={animation} onCardClick={onCardClick} />
          ))
        ) : (
          <p className="text-zinc-500 col-span-3 text-center py-10">
            No animations found matching "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}
