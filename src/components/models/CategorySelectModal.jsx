import React from 'react';
import { Type, Square, Circle, Star, X } from 'lucide-react';

export default function CategorySelectModal({ onSelect, onClose }) {
  const categories = [
    { id: 'box', name: 'Box Animation', icon: <Square size={32} /> },
    { id: 'text', name: 'Text Reveal', icon: <Type size={32} /> },
    { id: 'circle', name: 'Circle/Pulse', icon: <Circle size={32} /> },
    { id: 'icon', name: 'Icon Interaction', icon: <Star size={32} /> },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2 text-center">What are you building?</h2>
        <p className="text-zinc-400 text-center mb-8">Select the base element for your animation to preview it correctly.</p>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="flex flex-col items-center justify-center gap-4 p-8 bg-[#1e1e1e] border border-zinc-800 rounded-xl hover:border-blue-500 hover:bg-[#252526] transition-all group"
            >
              <div className="text-zinc-500 group-hover:text-blue-500 transition-colors">
                {cat.icon}
              </div>
              <span className="text-white font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
