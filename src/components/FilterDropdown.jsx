import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

export default function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Random 1");
  const dropdownRef = useRef(null);

  const options = ["Random 1", "Random 2", "Random 3"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative inline-flex items-center gap-1 px-4 py-2 rounded-[5px] text-left font-outfit hover:bg-zinc-800"
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='flex items-center gap-1 mr-1.5'>
        <Filter size={16} />
        <h3> Filters:</h3>
      </div>

      <button className='flex items-center gap-2'>{selected} <ChevronDown
          size={16}
          className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        /></button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-10 mt-2  w-[120px]  bg-[#121212] border border-zinc-800 rounded-[5px]  overflow-hidden z-[110] animate-in fade-in zoom-in-95 duration-200 ">
          <div className="p-1">
            {options.map(option => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm rounded-[5px] transition-colors cursor-pointer
                  ${
                    selected === option
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
