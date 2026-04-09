import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

export default function FilterDropdown({ previewOptions, setPreviewType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('text');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative inline-flex items-center gap-1 px-4 py-2 rounded-[5px] text-left font-outfit hover:bg-zinc-800 active:bg-zinc-700"
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center mr-1.5">
        <Filter size={16} className='text-zinc-500' />
        <h3 className="text-xs font-semibold text-zinc-500 uppercase px-3"> Preview Object Type:</h3>
      </div>

      <button className="flex items-center gap-2">
        {selected}{' '}
        <ChevronDown
          size={16}
          className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-10 mt-2  w-[120px]  bg-[#121212] border border-zinc-800 rounded-[5px]  overflow-hidden z-[110] animate-in fade-in zoom-in-95 duration-200 ">
          <div className="p-1">
            {previewOptions.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setSelected(option.id);
                  setIsOpen(false);
                  setPreviewType(option.id);
                }}
                className={`w-full text-left px-4 py-2 text-sm rounded-[5px] transition-colors cursor-pointer flex items-center gap-2
                  ${
                    selected === option.label
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {option.icon} {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
