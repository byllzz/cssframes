import React from 'react';
import AnimationCard from '../components/layout/AnimationCard';
import { Users, Info } from 'lucide-react';

export default function CommunityGrid({ animations, onCardClick, previewType }) {
  const communityAnims = animations.filter(anim => anim.isCommunity);

  return (
    <div className="p-6 md:p-10 w-full min-h-full bg-[#050505]">
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-500 mb-2">
          <Users size={20} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Public Gallery</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter">Community Animations</h1>
        <p className="text-zinc-500 text-sm max-w-md">
          Explore animations created and shared by the community. You can edit and test them in real-time.
        </p>
      </div>

      {communityAnims.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {communityAnims.map((anim) => (
            <AnimationCard
              key={anim.id}
              animation={anim}
              onCardClick={onCardClick}
              previewType={previewType}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-900 rounded-3xl">
          <div className="p-4 bg-zinc-900 rounded-full text-zinc-700 mb-4">
            <Users size={40} />
          </div>
          <h3 className="text-white font-bold text-lg">No community animations yet</h3>
          <p className="text-zinc-500 text-sm">Be the first to contribute one!</p>
        </div>
      )}
    </div>
  );
}
