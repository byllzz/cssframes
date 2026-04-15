import React, { useState } from 'react';
import { Eye, Bookmark, Share2, Star, Code2 } from 'lucide-react';

export default function AnimationCard({
  animation,
  onCardClick,
  previewType,
  onShareClick,
}) {
  const displayType = animation.isCommunity
    ? animation.type
    : previewType;

  const uniqueId = String(animation.id).replace(/[^a-zA-Z0-9]/g, '');
  const activeClass = `active-${uniqueId}`;
  const keyframeName = `kb-${uniqueId}`;

  const processedKeyframes = (animation.keyframes || '')
    .replace(/@keyframes\s+[\w-]+\s*{/, `@keyframes ${keyframeName} {`)
    .replace(/my-anim/g, keyframeName);

  const [codeBtnVisible, setCodeBtnVisible] = useState(false);

  return (
    <div
      className="w-full max-w-[420px] rounded-[8px] overflow-hidden"
      onMouseEnter={() => setCodeBtnVisible(true)}
      onMouseLeave={() => setCodeBtnVisible(false)}
    >
      {/* Preview */}
      <div
        onClick={() => onCardClick(animation)}
        className="relative aspect-3/2.5 bg-[#dddddd] cursor-pointer overflow-hidden flex items-center justify-center rounded-[8px]"
      >
        <style>{`
          ${processedKeyframes}
          .${activeClass} {
            animation: ${keyframeName} ${animation.duration || '2s'} ease-in-out infinite;
          }
        `}</style>

        <div className={`${activeClass} ${animation.tailwind || ''}`}>
          {displayType === 'box' && <div className="w-14 h-14 rounded-[10px] bg-black" />}

          {displayType === 'text' && <h1 className="text-7xl font-black text-black">Aa</h1>}

          {displayType === 'circle' && <div className="w-14 h-14 rounded-full bg-black" />}

          {displayType === 'icon' && <Star size={56} className="fill-black text-black" />}
        </div>

        {codeBtnVisible && (
          <button
            className="absolute right-3 bottom-2 text-[16px] text-[#000] font-medium flex items-center gap-[6px] hover:bg-[#161616] py-[5px] px-2 rounded-[5px] hover:text-zinc-300 cursor-pointer"
            onClick={() => onCardClick(animation)}
          >
            {' '}
            <Code2 size={18} /> <span>Get Code</span>
          </button>
        )}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-1 py-2 ">
        {/* Left title */}
        <h2 className="text-white text-[16px] font-semibold truncate">
          {animation.title || 'Galahhad'}
        </h2>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Views */}
          <div className="flex items-center gap-1 text-zinc-400">
            <Eye size={14} />
            <span className="text-sm">{animation.views || '98K'} views</span>
          </div>
          <button
            onClick={e => e.stopPropagation()}
            className="text-zinc-300 cursor-pointer hover:text-white transition"
            aria-label="Bookmark"
          >
            <Bookmark size={18} />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              onShareClick(animation);
            }}
            className="text-zinc-300 cursor-pointer hover:text-white transition"
            aria-label="Share"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
