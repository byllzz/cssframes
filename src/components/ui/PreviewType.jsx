import React from 'react'
import FilterDropdown from '../FilterDropdown';

export default function PreviewType({ previewType, setPreviewType, previewOptions }) {


  return (
    <>
      <div className="flex flex-row items-center">
        <div className="flex items-center gap-1">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase px-3 ">
            Preview Object Type
          </h3>
          <span className="flex flex-col items-center gap-[2px] relative right-2">
            <div className="h-1 w-1 rounded-full bg-zinc-500"></div>
            <div className="h-1 w-1 rounded-full bg-zinc-500"></div>
          </span>
        </div>

        {previewOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => setPreviewType(opt.id)}
            className={`flex items-center gap-1 px-3 py-1 text-[14px] font-medium font-heading transition-all cursor-pointer
                     ${
                       previewType === opt.id
                         ? 'bg-indigo-800 text-white border-zinc-100 shadow-lg rounded-[5px]'
                         : 'text-zinc-500'
                     }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
    </>
  );
}

