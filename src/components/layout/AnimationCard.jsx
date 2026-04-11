import React, { useState } from 'react';
import { Star, Zap, Heart, Share2, User, Code2, ArrowUpRight } from 'lucide-react';

export default function AnimationCard({ animation, onCardClick, previewType, onShareClick }) {
  const [liked, setLiked] = useState(false);
  const displayType = animation.isCommunity ? animation.type : previewType;
  const uniqueId = animation.id.replace(/[^a-zA-Z0-9]/g, '');
  const activeClass = `active-${uniqueId}`;
  const keyframeName = `kb-${uniqueId}`;

  const processedKeyframes = (animation.keyframes || '')
    .replace(/@keyframes\s+[\w-]+\s*{/, `@keyframes ${keyframeName} {`)
    .replace(/my-anim/g, keyframeName);

  return (
    <div className="group relative w-full bg-[#050505] rounded-[8px] p-3 transition-all duration-300 hover:bg-[#080808] cursor-pointer border border-white/5 hover:border-white/20 shadow-2xl overflow-hidden font-outfit">
      <style>{`
        ${processedKeyframes}
        .${activeClass} {
            animation: ${keyframeName} ${animation.duration || '2s'} cubic-bezier(0.16, 1, 0.3, 1) infinite !important;
        }
      `}</style>

      {/* 1. TOP NAV: USER DATA (Sharp Styling) */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[5px] bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
            <User size={14} className="text-zinc-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white uppercase tracking-tight leading-none">
              {animation.author || 'User_772'}
            </span>
            <span className="text-[8px] font-medium text-zinc-600 uppercase tracking-[0.1em]">
              Contributor
            </span>
          </div>
        </div>

        <button
          onClick={e => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`h-7 w-7 flex items-center justify-center rounded-[5px] transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/5 text-zinc-500 hover:text-white'}`}
        >
          <Heart size={12} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* 2. THE PREVIEW STAGE (High Contrast) */}
      <div
        onClick={() => onCardClick(animation)}
        className="relative aspect-video bg-white rounded-[5px] overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:scale-[0.98]"
      >
        {/* Engineering Crosshair Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Engine Badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white rounded-[3px] flex items-center gap-1.5 z-20">
          <Code2 size={10} strokeWidth={3} />
          <span className="text-[8px] font-black uppercase tracking-widest">
            {animation.tailwind ? 'TW_ENGINE' : 'CSS_RAW'}
          </span>
        </div>

        {/* The Asset */}
        <div className={`relative z-10 ${activeClass} ${animation.tailwind || ''}`}>
          {displayType === 'box' && <div className="w-12 h-12 bg-black rounded-[4px] shadow-xl" />}
          {displayType === 'text' && (
            <h1 className="text-6xl font-black text-black tracking-tighter italic">Aa</h1>
          )}
          {displayType === 'circle' && (
            <div className="w-12 h-12 bg-black rounded-full shadow-xl" />
          )}
          {displayType === 'icon' && <Star size={45} className="fill-black text-black" />}
        </div>

        {/* Sharp Hover Overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              Open Source
            </span>
          </div>
        </div>
      </div>

      {/* 3. INFO & STATS */}
      <div className="mt-4 px-1">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-none group-hover:italic">
              {animation.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest py-0.5 px-1.5 bg-zinc-900 border border-white/5 rounded-[3px]">
                ID: {String(animation.id).split('-')[0]}
              </span>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest py-0.5 px-1.5 bg-zinc-900 border border-white/5 rounded-[3px]">
                {animation.duration}
              </span>
            </div>
          </div>
          <div className="p-2 bg-white text-black rounded-[5px]">
            <Zap size={14} fill="currentColor" />
          </div>
        </div>

        {/* Brutalist Interaction Footer */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                Usage
              </span>
              <span className="text-[12px] font-bold text-zinc-300 tracking-tight">1.8k</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                Verified
              </span>
              <div className="w-3 h-3 bg-white mt-1 rounded-[2px]" />
            </div>
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              onShareClick(animation);
            }}
            className="h-8 px-4 flex items-center gap-2 bg-zinc-900 hover:bg-white hover:text-black rounded-[5px] transition-all duration-200 border border-white/5"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.1em]">Share Asset</span>
            <Share2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
