import React from 'react';

export default function PreviewType({ previewType, setPreviewType, previewOptions }) {
  return (
    <div className="flex flex-row items-center gap-4">
      {/* label & dots */}
      <div className="hidden xl:flex items-center gap-2">
        <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[1.5px] pl-2">
         Preview Object
        </h3>
        <div className="flex flex-col gap-0.5">
          <div className="h-1 w-1 rounded-full bg-zinc-700" />
          <div className="h-1 w-1 rounded-full bg-zinc-700" />
        </div>
      </div>

      {/* selector track */}
      <div className="flex items-center  gap-2 rounded-[5px]">
        {previewOptions.map((opt) => {
          const isActive = previewType === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => setPreviewType(opt.id)}
              className={`
                relative flex items-center gap-2 px-3 py-1.5 rounded-[5px] text-sm font-medium transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'bg-[#161616] text-white'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#161616]'
                }
              `}
            >
              {/* icon scaling */}
              <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100 opacity-70'}`}>
                {opt.icon}
              </span>

              <span className="hidden sm:inline tracking-tight">
                {opt.label}
              </span>

              {/* active indicator dot */}
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#050505]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
