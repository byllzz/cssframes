import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

export default function FilterDropdown({ previewOptions, setPreviewType, previewType }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // click out handler
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // get current label
  const currentLabel = previewOptions.find(opt => opt.id === previewType)?.label || 'Text';

  return (
    <div className="relative inline-block font-outfit" ref={dropdownRef}>
      {/* trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2  rounded-[5px] bg-[#161616] transition-all cursor-pointer group"
      >
        <Filter size={14} className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />

        <span className="text-[13px] font-medium text-zinc-400 border-r border-zinc-800 pr-3 mr-1 hidden sm:inline">
         Preview Object
        </span>

        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-zinc-100 capitalize">
            {currentLabel}

          </span>
          <ChevronDown
            size={16}
            className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* menu overlay */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#000]  rounded-[8px] z-[200] overflow-hidden p-1.5 animate-in fade-in zoom-in-95 duration-200">

          <div className="flex flex-col gap-1">
            {previewOptions.map(option => {
              const isActive = previewType === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setPreviewType(option.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-[5px] text-[14px] font-semibold transition-all cursor-pointer
                    ${isActive
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:bg-[#161616] hover:text-white'
                    }
                  `}
                >
                  <span className={isActive ? 'text-black' : 'text-zinc-500'}>
                    {option.icon}
                  </span>
                  {option.label}

                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
