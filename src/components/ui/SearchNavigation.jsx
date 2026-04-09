import { Command, Search } from 'lucide-react';
import React from 'react'

export default function SearchNavigation({ searchQuery, setSearchQuery }) {
  return (
    <div className="overflow-hidden h-10 w-[280px] rounded-[5px] flex items-center justify-center bg-[#161616] font-outfit">
      <label htmlFor="searchInput" className="flex items-center justify-between gap-2 w-full px-4">
        <span>
          <Search size={20} className="text-[#ccc]" />
        </span>
        <input type="text" id="searchInput" placeholder="Search..." className="text-white outline-none border-none w-[100%]" value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} />
      </label>
    </div>
  );
}

