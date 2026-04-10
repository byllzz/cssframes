import React, { useState } from 'react';
import { Type, Square, Circle, Star, X, ArrowRight } from 'lucide-react';

export default function CategorySelectModal({ onSelect, onClose }) {
  // Add local state to track which card is currently "Active"
  const [selectedId, setSelectedId] = useState(null);

  const categories = [
    { id: 'box', name: 'Box Animation', icon: <Square size={32} /> },
    { id: 'text', name: 'Text Reveal', icon: <Type size={32} /> },
    { id: 'circle', name: 'Circle/Pulse', icon: <Circle size={32} /> },
    { id: 'icon', name: 'Icon Interaction', icon: <Star size={32} /> },
  ];

  return (
    <div className="fixed inset-0 h-screen w-full flex items-center justify-center  animate-in fade-in duration-300 z-[100] font-outfit">
      <div className="bg-[#121212]  rounded-[12px] py-20 w-full max-w-[950px] p-10 relative h-full">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white transition-colors cursor-pointer"
        >
          <X size={28} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-[44px] font-heading font-black text-white mb-2 tracking-tight">What are you building?</h2>
          <p className="text-white text-[15px] font-medium">
            Select a base element to start coding your custom animation.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2  md:grid-cols-4 gap-4 mb-10">
          {categories.map((cat) => {
            const isActive = selectedId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedId(cat.id)} // Set active state on click
                className={`flex flex-col items-center justify-center gap-4 p-8 rounded-[5px] border transition-all font-heading duration-100 group cursor-pointer
                  ${
                    isActive
                      ? 'scale-96 bg-[#181818] border-indigo-500 '
                      : 'bg-[#181818] border-zinc-800 hover:border-zinc-600'
                  }`}
              >
                <div
                  className={`transition-all font-heading duration-300 ${isActive ? 'text-indigo-400 scale-110' : 'text-zinc-600 group-hover:text-zinc-400'}`}
                >
                  {cat.icon}
                </div>
                <span
                  className={`font-bold text-sm tracking-wide transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-end  pt-8">
          <button
            disabled={!selectedId} // Button is disabled until something is selected
            onClick={() => onSelect(selectedId)}
            className={`group flex items-center gap-3 px-7 font-outfit py-[10px] rounded-[5px] font-bold capitalize cursor-pointer tracking-wide text-[15px] transition-all
              ${selectedId
                ? 'bg-indigo-600 text-white active:scale-95 '
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
          >
            Continue

          </button>
        </div>
      </div>
    </div>
  );
}
