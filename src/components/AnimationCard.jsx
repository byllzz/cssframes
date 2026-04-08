import React from 'react';
import { Copy, Play } from 'lucide-react';

export default function AnimationCard({ animation, onCardClick }) {
  const styleSheet = `
    @keyframes ${animation.id} {
      ${animation.keyframes}
    }
    .${animation.id}-active {
      animation: ${animation.id} ${animation.duration || '0.5s'} ease-in-out infinite;
    }
  `;

  return (
    <div className="group bg-[#161616] border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all" onClick={() => onCardClick(animation)}>
      {/* Injecting the CSS directly into the DOM for this specific animation */}
      <style>{styleSheet}</style>

      {/* Preview Area */}
      <div className="h-32 flex items-center justify-center bg-[#0f0f0f] rounded-xl mb-4 overflow-hidden">
        <h1 className={`${animation.id}-active text-xl font-bold text-white`}>{animation.title}</h1>
      </div>

      {/* Info & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-200">{animation.title}</h3>
          <p className="text-xs text-zinc-500">{animation.category}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(animation.css)}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title="Copy CSS"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(animation.tailwind)}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title="Copy CSS"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
