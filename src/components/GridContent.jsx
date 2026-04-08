import React from 'react'
import AnimationCard from './AnimationCard'

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
    <div className="flex-1 h-screen overflow-y-auto bg-[#0f0f0f] py-6 px-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-white text-2xl font-bold">{selectedCategory}</h4>
          <p className="text-zinc-500 text-sm">{filteredPlates.length} animations found</p>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="bg-[#161616] border border-zinc-800 text-white px-4 py-2 rounded-lg focus:border-indigo-500 outline-none w-64"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
