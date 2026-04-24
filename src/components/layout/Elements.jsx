import React, { useMemo } from "react";
import { ChevronRight } from 'lucide-react';

export default function Elements({ animations = [], onNavigate, categories = [] }) {
  // Memoize counts to prevent recalculation on every render
  const categoryCounts = useMemo(() => {
    const counts = { All: animations.length };
    animations.forEach(anim => {
      counts[anim.category] = (counts[anim.category] || 0) + 1;
    });
    return counts;
  }, [animations]);

  return (
    <div className="w-full max-w-[700px] bg-[#161616] rounded-xl border border-white/10 p-3 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {categories.map((item) => {
          const Icon = item.icon;
          const count = categoryCounts[item.name] || 0;

          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className="group relative flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#222] border border-white/[0.03] hover:border-white/10 transition-all duration-200 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 z-10">
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-white/[0.03] text-gray-400 group-hover:text-violet-400 transition-colors">
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className={item.animate ? 'animate-spin' : ''}
                  />
                </div>
                <span className="text-[14px] font-medium text-gray-300 group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-2 z-10">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.05] text-gray-400 group-hover:text-violet-300 transition-colors">
                  {count}
                </span>
                <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transform group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
