import React from 'react';
import { ArrowUpRight, Copy } from 'lucide-react';
import { animations } from '../data/animations';

export default function AnimationCard({ animation, onCardClick }) {
  const styleSheet = `
    @keyframes ${animation.id} {
      ${animation.keyframes}
    }
    .active-${animation.id} {
      animation: ${animation.id} ${animation.duration || '2s'} ease-in-out infinite;
    }
  `;

  // const handleCopy = (e, text) => {
  //   e.stopPropagation();
  //   navigator.clipboard.writeText(text);
  // };







  return (
    <div
      onClick={() => onCardClick(animation)}
      className={`group  bg-black rounded-[2rem] p-2 w-full h-92 max-w-sm cursor-pointer transition-transform  duration-300 shadow-sm font-outfit`
}
    >
      <style>{styleSheet}</style>

      {/* Top Section: Text Info */}
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-2xl font-semibold text-zinc-900 leading-tight">{animation.title}</h2>
        <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">
          {animation.category}
        </p>
      </div>

      {/* Preview Area (The "Shoe" Box) */}
      <div className="relative aspect-[4/3] bg-white/80  rounded-[2rem] overflow-hidden flex items-center justify-center border border-zinc-100">
        {/* Animated Element */}
        <div className={`active-${animation.id} flex flex-col items-center`}>
          <div className="w-12 h-12 bg-indigo-500 rounded-xl mb-2 shadow-lg shadow-indigo-500/40" />
          <span className="text-white/20 font-mono text-xs uppercase tracking-widest">Preview</span>
        </div>

        {/* Floating Action Button (Bottom Right) */}
        <button className="absolute bottom-5 right-5 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
          <ArrowUpRight size={24} />
        </button>

      </div>
    </div>
  );
}
