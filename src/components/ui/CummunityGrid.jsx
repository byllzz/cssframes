import React from 'react';
import AnimationCard from '../layout/AnimationCard';
import { Users, Sparkles, Plus, ArrowLeft } from 'lucide-react';

export default function CommunityGrid({
  animations,
  onCardClick,
  previewType,
  handleStartCreating,
  onShareClick,
  onBack
}) {
  const communityAnims = animations.filter(anim => anim.isCommunity);

  return (
    <div className="p-6 md:py-10 md:px-10 w-full min-h-screen bg-[#050505] relative overflow-hidden font-outfit">

      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-40 bg-blue-600/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] opacity-40 bg-purple-600/5 blur-[100px] rounded-full -ml-32 -mt-32 pointer-events-none" />

      {/* Top Navigation */}
      <button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Curated Library
      </button>

      {/* Header Section */}
      <div className="relative mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <div className="p-1.5 bg-indigo-500/10 rounded-[5px] border border-indigo-500/20">
              <Users size={14} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none">
              Source Repository
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              Community <br />
              <span className="text-zinc-800 transition-colors duration-500 hover:text-zinc-700">
                Library
              </span>
            </h1>
          </div>

          <p className="text-zinc-500 text-sm md:text-base max-w-xl leading-tight font-medium">
            A collective of motion presets designed for scale. <br />
            Inspect, fork, and integrate production-grade CSS.
          </p>
        </div>

        {/* action & states area*/}
        <div className="flex items-center gap-4 self-start lg:self-auto">
          <div className="hidden sm:flex flex-col items-end mr-6 border-r border-zinc-900 pr-6">
            <span className="text-white font-black text-6xl tracking-wider leading-none">
              {String(communityAnims.length).padStart(2, '0')}
            </span>
            <span className="text-zinc-700 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">
              Total Units
            </span>
          </div>

          <button
            onClick={handleStartCreating}
            className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-[5px] font-black text-[11px] uppercase tracking-[0.15em] transition-all active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <Plus size={16} strokeWidth={4} /> Submit Animation
          </button>
        </div>
      </div>

      {/* Grid Content */}
      {communityAnims.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {communityAnims.map(anim => (
            <div key={anim.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <AnimationCard
                animation={anim}
                onCardClick={onCardClick}
                previewType={previewType}
                onShareClick={onShareClick}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Sharp Empty State */
        <div className="relative flex flex-col items-center justify-center py-40 border border-zinc-900 bg-[#060606] rounded-[5px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-50" />

          <div className="relative p-5 text-zinc-800 mb-8">
            <Sparkles size={40} strokeWidth={1} />
          </div>

          <h3 className="relative text-zinc-800 font-black text-xs uppercase tracking-[0.5em] mb-6">
            Nothing to Show
          </h3>

          <p className="relative text-zinc-100 text-center max-w-3xl px-6 text-3xl md:text-5xl font-black uppercase tracking-wide leading-[0.9] mb-12 transition-all">
            The community database is <span className="text-zinc-800">empty.</span> <br />
            Contribute the first <span className="underline decoration-zinc-800 underline-offset-8 text-zinc-400">preset.</span>
          </p>

          <button
            onClick={handleStartCreating}
            className="relative bg-zinc-100 hover:bg-white text-black px-10 py-4 rounded-[5px] font-black text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            Deploy Animation
          </button>
        </div>
      )}

      {/*  Footnote Decoration */}
      <div className="mt-20 flex items-center gap-4 opacity-20 group pb-10">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
        <span className="text-[9px] font-bold uppercase tracking-[1em] text-zinc-500">
          CSSFRAMES
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
      </div>
    </div>
  );
}
