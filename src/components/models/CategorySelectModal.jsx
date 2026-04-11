import React, { useState } from 'react';
import {
  X, MousePointer2, Loader2, LogIn, Zap, CreditCard, Move3d,
  Type, Sparkles, Shapes, Monitor, Box, LayoutGrid, ArrowRight,
  Square, Circle, Star
} from 'lucide-react';

export default function CategorySelectModal({ onSelect, onClose }) {
  const [selectedId, setSelectedId] = useState(null);
  const [objectType, setObjectType] = useState(null);

  const categories = [
    { id: 'Buttons', name: 'Button Animation', icon: <MousePointer2 size={32} /> },
    { id: 'Loaders', name: 'Loader Animation', icon: <Loader2 size={32} /> },
    { id: 'Entrances', name: 'Entrance Animation', icon: <LogIn size={32} /> },
    { id: 'Transitions', name: 'Transition Animation', icon: <Zap size={32} /> },
    { id: 'Cards', name: 'Card Animation', icon: <CreditCard size={32} /> },
    { id: 'Text', name: 'Text Animation', icon: <Type size={32} /> },
    { id: 'Icons', name: 'Icon Animation', icon: <Sparkles size={32} /> },
    { id: '3D/Space', name: '3D Space Animation', icon: <Move3d size={32} /> },
    { id: 'Shapes', name: 'Shape Animation', icon: <Shapes size={32} /> },
    { id: 'Viewports', name: 'Viewport Animation', icon: <Monitor size={32} /> },
    { id: 'Components', name: 'Component Animation', icon: <Box size={32} /> },
    { id: 'Misc', name: 'Misc Animation', icon: <LayoutGrid size={32} /> },
  ];

  const objectTypes = [
    { id: 'box', name: 'Box', icon: <Square size={14} /> },
    { id: 'circle', name: 'Circle', icon: <Circle size={14} /> },
    { id: 'text', name: 'Text', icon: <Type size={14} /> },
    { id: 'icon', name: 'Icon', icon: <Star size={14} /> },
  ];

  const isReady = selectedId && objectType;

  // HANDLER: Ensures data is clean before passing to the next path
  const handleContinue = () => {
    if (isReady) {
      onSelect({
        category: selectedId,
        type: objectType
      });
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-full flex items-center justify-center animate-in fade-in duration-300 z-[100] font-outfit px-4 backdrop-blur-sm bg-black/60">
      <div className="bg-[#121212] border border-white/5 rounded-[12px] w-full max-w-[950px] relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)]">

        {/* Progress Bar */}
        <div className="h-1 w-full bg-zinc-900">
           <div className={`h-full bg-indigo-500 transition-all duration-700 shadow-[0_0_15px_rgba(99,102,241,0.5)]
            ${isReady ? 'w-full' : selectedId || objectType ? 'w-1/2' : 'w-[5%]'}`}
           />
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors cursor-pointer z-10">
          <X size={24} />
        </button>

        <div className="p-10 md:p-12 overflow-y-auto scrollbar-hide">
          <header className="mb-10 text-center">
            <h2 className="text-[44px] font-black text-white mb-2 tracking-tight">Define the Motion.</h2>
            <p className="text-zinc-400 text-[15px] font-medium">Select an animation category and a base element to initialize.</p>
          </header>

          {/* MAIN CATEGORY GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((cat) => {
              const isActive = selectedId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedId(cat.id)}
                  className={`flex flex-col items-center justify-center gap-4 p-6 rounded-[8px] border transition-all duration-200 group cursor-pointer
                    ${isActive
                      ? 'bg-[#1a1a1a] border-indigo-500 scale-[0.98] shadow-[0_0_30px_rgba(99,102,241,0.1)]'
                      : 'bg-[#0A0A0A] border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className={`transition-all duration-300 ${isActive ? 'text-indigo-400 scale-110' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    {cat.icon}
                  </div>
                  <span className={`font-bold text-[10px] uppercase tracking-widest text-center transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6">

            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                1. Select Object Type
                {!objectType && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
              </span>
              <div className="flex bg-[#0A0A0A] p-1 rounded-[6px] border border-white/5">
                {objectTypes.map((obj) => {
                   const isObjActive = objectType === obj.id;
                   return (
                    <button
                      key={obj.id}
                      onClick={() => setObjectType(obj.id)}
                      className={`p-2 rounded-[4px] transition-all flex items-center gap-2 px-4
                        ${isObjActive
                          ? 'bg-indigo-600/20 border border-indigo-500 text-indigo-400 shadow-xl'
                          : 'text-zinc-600 hover:text-zinc-400 border border-transparent'}`}
                    >
                      {obj.icon}
                      <span className="text-[10px] font-black uppercase tracking-tighter">{obj.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              disabled={!isReady}
              onClick={handleContinue}
              className={`group flex items-center gap-3 px-10 py-4 rounded-[8px] font-black uppercase tracking-widest cursor-pointer text-[13px] transition-all
                ${isReady
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 '
                  : 'bg-zinc-900 text-zinc-700 cursor-not-allowed opacity-50'
                }`}
            >
              {isReady ? 'Continue' : 'Pick Category & Object'}
              <ArrowRight size={18} className={`transition-transform ${isReady ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
