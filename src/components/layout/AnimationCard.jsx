import React, { useState, useMemo } from 'react';
import { Share2, Star, Code2, User, Clock } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion'; // Added motion

export default function AnimationCard({ animation, onCardClick, previewType, onShareClick }) {
  const [hovered, setHovered] = useState(false);

  const creator = animation.creator || {
    name: animation.creatorName || 'Anonymous',
    github: animation.github,
    twitter: animation.twitter,
  };

  // Logic: Use global previewType if available, otherwise fallback to card-specific type
  const displayType = previewType || animation.type || 'box';

  const uniqueId = useMemo(
    () => String(animation.id || '').replace(/[^a-zA-Z0-9]/g, ''),
    [animation.id]
  );

  const activeClass = `active-${uniqueId}`;
  const keyframeName = `kb-${uniqueId}`;
  const isDarkBg = animation.previewBg && animation.previewBg !== '#e8e8e8' && animation.previewBg !== '#ffffff';

  const finalCSS = useMemo(() => {
    const raw = animation.keyframes || '';
    const renamed = raw
      .replace(/@keyframes\s+[\w-]+\s*{/, `@keyframes ${keyframeName} {`)
      .replace(/my-anim/g, keyframeName);

    return `
      ${renamed}
      .${activeClass} {
        animation: ${keyframeName} ${animation.duration || '2s'} ease-in-out infinite !important;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    `;
  }, [animation.keyframes, animation.duration, keyframeName, activeClass]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-[380px] bg-white border border-zinc-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-zinc-300"
    >
      <div
        onClick={() => onCardClick(animation)}
        className="relative aspect-[4/3] flex items-center justify-center cursor-pointer border-b border-zinc-100 transition-colors duration-500"
        style={{ backgroundColor: animation.previewBg || '#f4f4f5' }}
      >
        <style>{finalCSS}</style>

        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-md shadow-sm z-10">
          <Clock size={10} className="text-zinc-500" />
          <span className="text-[10px] font-bold text-zinc-600">{animation.duration || '2s'}</span>
        </div>

        {animation.isCommunity && (
          <div className="absolute top-2 right-2 text-[11px]  font-heading text-red-900">
            <span>Community Based</span>
          </div>
        )}

        {/* The Animated Wrapper */}
        <div className={`${activeClass} pointer-events-none`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={displayType}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {displayType === 'box' && (
                <div
                  className={`w-12 h-12 rounded-sm shadow-sm ${isDarkBg ? 'bg-white' : 'bg-zinc-900'}`}
                />
              )}
              {displayType === 'circle' && (
                <div
                  className={`w-12 h-12 rounded-full shadow-sm ${isDarkBg ? 'bg-white' : 'bg-zinc-900'}`}
                />
              )}
              {displayType === 'text' && (
                <h1
                  className={`text-5xl font-black tracking-tighter ${isDarkBg ? 'text-white' : 'text-zinc-900'}`}
                >
                  Aa
                </h1>
              )}
              {displayType === 'icon' && (
                <Star
                  size={48}
                  className={`${isDarkBg ? 'text-white fill-white' : 'text-zinc-900 fill-zinc-900'}`}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute right-2 bottom-2 transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <button
            className={`flex items-center gap-2 px-4 py-2 ${isDarkBg ? 'bg-white text-black' : 'bg-zinc-900 text-white'} text-[11px] font-bold uppercase tracking-wider rounded-[5px] shadow-lg`}
          >
            <Code2 size={14} /> Get Code
          </button>
        </div>
      </div>

      {/* Info Area Remains the Same */}
      <div className="px-4 py-5">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1 overflow-hidden">
            <h2 className="text-zinc-900 font-bold text-sm tracking-tight leading-tight uppercase truncate">
              {animation.title || 'Untitled'}
            </h2>
            <p className="text-zinc-500 text-[12px] leading-snug line-clamp-2">
              {animation.desc || 'Custom CSS animation.'}
            </p>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              onShareClick(animation);
            }}
            className="text-zinc-400 hover:text-zinc-900 transition-colors ml-2"
          >
            <Share2 size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center border border-zinc-200">
              <User size={12} className="text-zinc-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase font-bold leading-none mb-1">
                Author
              </span>
              <span className="text-[11px] font-bold text-zinc-700 leading-none">
                {creator.name}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            {creator.github && (
              <a
                href={creator.github}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-900"
              >
                <FaGithub size={20} />
              </a>
            )}
            {creator.twitter && (
              <a
                href={creator.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-900"
              >
                <FaTwitter size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
