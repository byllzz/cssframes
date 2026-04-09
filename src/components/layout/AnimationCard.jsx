import React, { useMemo } from 'react';
import { Star, Zap, Hash } from 'lucide-react';

export default function AnimationCard({ animation, onCardClick, previewType }) {
  const activeClass = `active-${animation.id}`;

  return (
    <div
      onClick={() => onCardClick(animation)}
      className="group bg-[#121212] rounded-[12px] p-2 w-full cursor-pointer border border-zinc-800/50 transition-colors duration-300 hover:border-zinc-700 font-outfit shadow-xl overflow-hidden will-change-transform"
    >
      <style>{`
        @keyframes ${animation.id} { ${animation.keyframes} }
        .${activeClass} {
           animation: ${animation.id} ${animation.duration || '2s'} ease-in-out infinite;
           will-change: transform, opacity;
        }
      `}</style>

      {/*  Preview Area */}
      <div className="relative aspect-[3/2] bg-[#fdfdfd] rounded-[10px] overflow-hidden flex items-center justify-center ">
        {/* preview screen */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '15px 15px',
            backgroundPosition: 'center center',
          }}
        />

        {/* Animated Element */}
        <div className="relative flex items-center justify-center scale-110 z-10">
          {previewType === 'box' && (
            <div className={`${activeClass} w-12 h-12 bg-black rounded-[8px] shadow-md`} />
          )}
          {previewType === 'text' && (
            <h1 className={`${activeClass} text-5xl font-black text-zinc-900 tracking-tighter`}>
              Aa
            </h1>
          )}
          {previewType === 'circle' && (
            <div className={`${activeClass} w-12 h-12 bg-black rounded-full shadow-md`} />
          )}
          {previewType === 'icon' && (
            <div className={`${activeClass}`}>
              <Star size={42} className="fill-blue-600 text-black" />
            </div>
          )}
        </div>

        {/* duration pill  */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-zinc-900 rounded-full border border-white/10 text-[10px] text-white font-medium z-10 flex items-center gap-1">
          <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Duration :</p>
          {animation.duration || '2.0s'}
        </div>
      </div>

      {/* Card Info */}
      <div className="mt-3 px-2 flex justify-between items-start">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors truncate">
            {animation.title}
          </h2>
          <div className="flex items-center gap-1.5 mt-1">
            <Zap size={10} className="text-zinc-500" />
            <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-tighter">
              CSS FRAMES
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 ml-2 flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
          <Hash size={8} className="text-zinc-600" />
          <span className="text-[9px] text-zinc-500 font-mono uppercase">
            {animation.id.split('-')[0]}
          </span>
        </div>
      </div>

      {/*  Description */}
      <div className="mt-3 bg-[#090909] rounded-[10px] p-3 border border-zinc-800/50 h-[85px] flex flex-col justify-start overflow-hidden">
        <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mb-1.5">
          Description
        </p>
        <p className="text-[11px] text-zinc-400 font-medium font-outfit leading-tight line-clamp-3">
          {animation.desc}
        </p>
      </div>
    </div>
  );
}
