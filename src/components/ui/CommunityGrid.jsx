import React from 'react';
import AnimationCard from '../layout/AnimationCard';
import { Users, Sparkles, Plus, ArrowLeft } from 'lucide-react';

export default function CommunityGrid({
  animations,
  onCardClick,
  previewType,
  handleStartCreating,
  onShareClick,
  onNavigate
}) {
  const communityAnims = animations.filter(anim => anim.isCommunity);

  return (
    <div className="p-6 md:py-10 md:px-10 w-full min-h-screen font-outfit">
      {/* Back navigation */}
      <button
        onClick={() => onNavigate('Animations')}
        className="mb-10 flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white transition-colors group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to library
      </button>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 pb-8 border-b border-white/10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#7c3aed]">
            <Users size={15} />
            <span className="text-[12px] font-semibold uppercase tracking-wider">
              Community
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Community library
          </h1>
          <p className="text-white/50 text-[14px] max-w-md leading-relaxed">
            Animations submitted by other developers - inspect, copy, and use
            them freely.
          </p>
        </div>

        <div className="flex items-center gap-6 self-start lg:self-auto">
          <div className="flex flex-col">
            <span className="text-white font-bold text-3xl leading-none">
              {communityAnims.length}
            </span>
            <span className="text-white/40 text-[12px] mt-1">
              submitted
            </span>
          </div>

          <button
            onClick={handleStartCreating}
            className="flex items-center gap-2 bg-[#7c3aed] hover:opacity-90 text-[#fff] px-5 py-2.5 rounded-[10px] font-semibold text-[13px] transition-all active:scale-95"
          >
            <Plus size={15} strokeWidth={2.5} /> Submit animation
          </button>
        </div>
      </div>

      {/* Grid */}
      {communityAnims.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {communityAnims.map(anim => (
            <AnimationCard
              key={anim.id}
              animation={anim}
              onCardClick={onCardClick}
              previewType={previewType}
              onShareClick={onShareClick}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-28 border border-white/10 rounded-[16px] bg-[#161616]">
          <div className="p-4 rounded-full bg-white/5 mb-5">
            <Sparkles size={28} className="text-white/40" strokeWidth={1.5} />
          </div>

          <h3 className="text-white font-semibold text-[17px] mb-2">
            No submissions yet
          </h3>

          <p className="text-white/40 text-[14px] text-center max-w-sm mb-7 leading-relaxed">
            Be the first to share an animation with the community.
          </p>

          <button
            onClick={handleStartCreating}
            className="bg-[#7c3aed] hover:opacity-90 text-[#fff] px-6 py-3 rounded-[10px] font-semibold text-[13px] transition-all active:scale-95"
          >
            Submit animation
          </button>
        </div>
      )}
    </div>
  );
}
