import React from 'react';
import { Info, Shield, Calendar, Terminal, Fingerprint } from 'lucide-react';

export default function DetailsSection({ animation }) {
  return (
    <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 1. Description & Info Card */}
      <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-6 transition-all hover:border-zinc-700">
        {/* Beautiful Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 text-blue-500">
            <Info size={18} />
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">Animation Details</h3>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">{animation.title}</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-outfit">
            {animation.desc || "This high-performance CSS animation is optimized for modern browsers using GPU acceleration. Perfect for hero sections, loading states, or interactive UI elements."}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 text-[11px] text-zinc-400">
              <Terminal size={12} />
              <span>Engine: CSS3 Keyframes</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 text-[11px] text-zinc-400">
              <Calendar size={12} />
              <span>Updated: April 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. License & Security Card */}
      <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-6 transition-all hover:border-zinc-700">
        {/* Diagonal Stripe Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4 text-green-500">
            <Shield size={18} />
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">Usage Rights</h3>
          </div>

          <div className="mb-4">
            <span className="text-3xl font-black text-white block">MIT</span>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-tighter">License Agreement</span>
          </div>

          <p className="text-zinc-500 text-[12px] leading-snug mb-6 italic">
            "Permission is hereby granted, free of charge, to any person obtaining a copy of this software..."
          </p>

          <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fingerprint size={14} className="text-zinc-600" />
              <span className="text-[10px] text-zinc-600 font-mono uppercase">V.1.0.4-Stable</span>
            </div>
            <a href="#" className="text-[10px] text-blue-500 font-bold hover:underline">Read Full</a>
          </div>
        </div>
      </div>
    </div>
  );
}
