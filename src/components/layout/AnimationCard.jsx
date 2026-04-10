import React from 'react';
import { Star, Zap, Hash } from 'lucide-react';

export default function AnimationCard({ animation, onCardClick, previewType }) {
  const displayType = animation.isCommunity ? animation.type : previewType;

  const uniqueId = animation.id.replace(/[^a-zA-Z0-9]/g, '');
  const activeClass = `active-${uniqueId}`;
  const keyframeName = `kb-${uniqueId}`;

  // Clean the keyframes and force our unique name
  const processedKeyframes = (animation.keyframes || '')
    .replace(/@keyframes\s+[\w-]+\s*{/, `@keyframes ${keyframeName} {`)
    .replace(/my-anim/g, keyframeName);

  return (
    <div
      onClick={() => onCardClick(animation)}
      className="group bg-[#121212] rounded-[12px] p-2 w-full cursor-pointer border border-zinc-800/50 transition-colors duration-300 hover:border-zinc-700 font-outfit shadow-xl overflow-hidden will-change-transform"
    >
      <style>{`
      ${processedKeyframes}
      .${activeClass} {
          animation: ${keyframeName} ${animation.duration || '2s'} ease-in-out infinite !important;
      }
    `}</style>

      {/* Preview Area (Container) - REMOVED animation classes from here */}
      <div className="relative aspect-[3/2] bg-[#fdfdfd] rounded-[10px] overflow-hidden flex items-center justify-center">

        {/* Community Tag */}
        {animation.isCommunity && (
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-2 py-1 bg-blue-600/10 border border-blue-500/20 rounded-md backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter">
              Community
            </span>
          </div>
        )}

        {/* preview screen grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '15px 15px',
          }}
        />

        {/* Animated Element Wrapper - ONLY this part animates now */}
        <div className={`relative flex items-center justify-center scale-110 z-10 ${activeClass} ${animation.tailwind || ''}`}>
            {displayType === 'box' && (
              <div className="w-12 h-12 bg-black rounded-[8px] shadow-md" />
            )}
            {displayType === 'text' && (
              <h1 className="text-5xl font-black text-zinc-900 tracking-tighter">Aa</h1>
            )}
            {displayType === 'circle' && (
              <div className="w-12 h-12 bg-black rounded-full shadow-md" />
            )}
            {displayType === 'icon' && <Star size={42} className="fill-blue-600 text-black" />}
        </div>

        {/* duration pill */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-zinc-900 rounded-full border border-white/10 text-[10px] text-white font-medium z-20 flex items-center gap-1">
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
            <Zap size={10} className={animation.tailwind ? 'text-sky-400' : 'text-zinc-500'} />
            <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-tighter">
              {animation.tailwind ? 'Tailwind CSS' : 'CSS Keyframes'}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 ml-2 flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
          <Hash size={8} className="text-zinc-600" />
          <span className="text-[9px] text-zinc-500 font-mono uppercase">
            {String(animation.id).split('-')[0]}
          </span>
        </div>
      </div>

      {/* Description */}
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
