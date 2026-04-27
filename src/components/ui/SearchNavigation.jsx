import { Command, Search } from 'lucide-react';
import React , {useEffect, useRef} from 'react';

export default function SearchNavigation({ searchQuery, setSearchQuery }) {
  const inputRef = useRef(null);

  useEffect(() => {
    
    const down = e => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };


    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  return (
    <div className="relative group overflow-hidden h-11 w-full max-w-[320px] transition-all duration-300">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <Search
          size={16}
          className="text-zinc-600 group-focus-within:text-white transition-colors duration-300"
          strokeWidth={2.5}
        />
      </div>

      <input
        ref={inputRef}
        type="text"
        id="searchInput"
        placeholder="Find an animation..."
        className="w-full h-full pl-11 pr-14 bg-[#111111] text-zinc-200 text-sm font-medium placeholder:text-zinc-600
                   rounded-[5px] border border-white/[0.05] outline-none
                   focus:bg-black focus:border-white/20 focus:ring-4 focus:ring-white/[0.02]
                   transition-all duration-300 shadow-2xl"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/*Shortcut */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-1 bg-zinc-900 rounded-md border border-white/[0.05] pointer-events-none">
        <Command size={10} className="text-zinc-500" />
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter">K</span>
      </div>

      {/* Bottom Focus Line Detail */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400 to-transparent group-focus-within:w-1/2 transition-all duration-500 opacity-50" />
    </div>
  );
}
