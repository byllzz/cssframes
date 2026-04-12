import React, { useState } from 'react';
import {
  Star,
  Zap,
  Heart,
  Share2,
  User,
  Code2,
  ArrowUpRight,
  Eye,
  Bookmark,
} from 'lucide-react';

export default function AnimationCard({
  animation,
  onCardClick,
  previewType,
  onShareClick,
}) {
  const [liked, setLiked] = useState(false);
  const displayType = animation.isCommunity ? animation.type : previewType;

  const uniqueId = String(animation.id).replace(/[^a-zA-Z0-9]/g, '');
  const activeClass = `active-${uniqueId}`;
  const keyframeName = `kb-${uniqueId}`;

  const processedKeyframes = (animation.keyframes || '')
    .replace(/@keyframes\s+[\w-]+\s*{/, `@keyframes ${keyframeName} {`)
    .replace(/my-anim/g, keyframeName);

  return (
    <div className="group relative w-full rounded-[18px] bg-[#070707] p-3 shadow-2xl border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
      <style>{`
        ${processedKeyframes}
        .${activeClass} {
          animation: ${keyframeName} ${animation.duration || '2s'} cubic-bezier(0.16, 1, 0.3, 1) infinite !important;
        }
      `}</style>

      {/* Preview */}
      <div
        onClick={() => onCardClick(animation)}
        className="relative aspect-[1/1] rounded-[16px] bg-[#e9e9e9] overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-[0.99]"
      >
        {/* Soft background shading */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.9),rgba(233,233,233,1))]" />

        {/* tiny top-left badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-black/80 px-2 py-1 text-[9px] font-semibold text-white">
          <Code2 size={10} strokeWidth={2.5} />
          {animation.css ? 'CSS' : 'Tailwind'}
        </div>

        {/* Asset */}
        <div className={`relative z-10 ${activeClass} ${animation.tailwind || ''}`}>
          {displayType === 'box' && (
            <div className="w-14 h-14 rounded-[10px] bg-black shadow-[0_12px_30px_rgba(0,0,0,0.25)]" />
          )}
          {displayType === 'text' && (
            <h1 className="text-7xl font-black text-black tracking-tighter italic">Aa</h1>
          )}
          {displayType === 'circle' && (
            <div className="w-14 h-14 rounded-full bg-black shadow-[0_12px_30px_rgba(0,0,0,0.25)]" />
          )}
          {displayType === 'icon' && (
            <Star size={56} className="fill-black text-black drop-shadow-lg" />
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center z-30">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
            <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
              <ArrowUpRight size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-3 flex items-end justify-between gap-3 px-1">
        <div className="min-w-full">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-[18px] font-semibold text-white leading-none truncate">
                {animation.title}
              </h2>

              {animation.isCommunity && (
                <span className="px-2 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wide shrink-0">
                  Community
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 text-zinc-400">
              <Eye size={13} />
              <span className="text-[13px] font-medium">{animation.views || '98K'} views</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3 justify-between text-zinc-500">
            <div className="flex items-center gap-1.5">
              <User size={13} />
              <span className="text-[13px] font-medium truncate max-w-[110px]">
                {animation.author || 'Galahhad'}
              </span>
            </div>
            {/* Right bottom icon buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={e => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className={`h-9 w-9 rounded-full flex items-center justify-center transition-all border ${
                  liked
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                }`}
                aria-label="Like"
              >
                <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={e => {
                  e.stopPropagation();
                  onShareClick(animation);
                }}
                className="h-9 w-9 rounded-full flex items-center justify-center bg-transparent text-zinc-400 border border-white/10 hover:border-white/25 hover:text-white transition-all"
                aria-label="Share"
              >
                <Share2 size={15} />
              </button>

              <button
                onClick={e => e.stopPropagation()}
                className="h-9 w-9 rounded-full flex items-center justify-center bg-transparent text-zinc-400 border border-white/10 hover:border-white/25 hover:text-white transition-all"
                aria-label="Save"
              >
                <Bookmark size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
