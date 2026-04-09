import { Command, Search } from 'lucide-react';
import React from 'react'

export default function SearchNavigation({ searchQuery, setSearchQuery }) {
  return (
    <div className="overflow-hidden h-10 w-[280px] rounded-full flex items-center justify-center bg-[#161616] font-outfit">
      <label htmlFor="searchInput" className="flex items-center justify-between gap-2 w-full px-4">
        <span>
          <Search size={20} className="text-[#ccc]" />
        </span>
        <input type="text" id="searchInput" placeholder="Search..." className="text-white outline-none border-none w-[100%] focus:ring-2 focus:ring-white" value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} />
        <div className="flex items-center gap-0 px-2 rounded-3xl bg-black relative left-2">
          <span>
            <Command size={15} className="text-[#ccc]" />
          </span>
          <h3 className='text-white'>K</h3>
        </div>
      </label>
    </div>
  );
}

