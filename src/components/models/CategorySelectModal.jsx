import React, { useState } from 'react';
import {
  X,
  Square,
  Circle,
  Type,
  Star,
} from 'lucide-react';
import  {categories} from '../../data/animationCategories'

export default function CategorySelectModal({ onSelect, onClose }) {
  const [selectedId, setSelectedId] = useState(null);
  const [objectType, setObjectType] = useState(null);

  const objectTypes = [
    { id: 'box', name: 'Box', icon: <Square size={14} /> },
    { id: 'circle', name: 'Circle', icon: <Circle size={14} /> },
    { id: 'text', name: 'Text', icon: <Type size={14} /> },
    { id: 'icon', name: 'Icon', icon: <Star size={14} /> },
  ];

  const isReady = selectedId && objectType;
  // Derived directly from state, rather than tracked separately and
  // synced via an effect — one less render, one less place to drift.
  const showGuide = !selectedId && !objectType;

  const handleContinue = () => {
    if (!isReady) return;
    onSelect({ category: selectedId, type: objectType });
  };

  return (
    <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/70 backdrop-blur-md px-3 sm:px-4 font-outfit ">
      <div className="relative w-full max-w-[1000px] max-h-[95vh] overflow-y-auto rounded-[12px] bg-[#0b0b0c] scrollbar-hide">
        {/* top line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-5 sm:p-6 md:p-8">
          {/* Guide */}
          {showGuide && (
            <div className="mb-6 md:absolute md:right-8 md:top-16 md:max-w-md rounded-[8px] border border-white/10 bg-white/[0.03] p-4 flex gap-3">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/[0.06] text-white text-[11px] font-semibold">
                i
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-white mb-1">Quick guide</h3>
                <p className="text-[13px] text-zinc-400 leading-5">
                  Choose a <span className="text-white">category</span> and a{' '}
                  <span className="text-white">base object</span>.
                </p>
              </div>
            </div>
          )}

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
              cssframes
            </p>

            <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-semibold text-white leading-tight">
              Create animation preset
            </h2>

            <p className="text-zinc-500 text-[13px] sm:text-[14px] mt-3 max-w-[420px]">
              Choose a category and base object.
            </p>
          </header>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10  ">
            {categories.map(cat => {
              const isActive = selectedId === cat.name;

              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedId(cat.name)}
                  className={`rounded-[6px] border p-4 sm:p-5 text-left transition-all ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-600 scale-[0.98]'
                      : 'bg-white/[0.02] border-white/20 hover:border-white/10'
                  }`}
                >
                  <div className={`mb-3 ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                  <cat.icon size={18} />
                  </div>

                  <p
                    className={`text-[12px] sm:text-[13px] font-medium ${
                      isActive ? 'text-white' : 'text-zinc-400'
                    }`}
                  >
                    {cat.name}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-t border-white/5 pt-6 sm:pt-8">
            {/* Object Types */}
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-3">
                Base object
              </p>

              <div className="flex flex-wrap gap-2">
                {objectTypes.map(obj => {
                  const isObjActive = objectType === obj.id;

                  return (
                    <button
                      key={obj.id}
                      onClick={() => setObjectType(obj.id)}
                      className={`h-10 sm:h-11 px-4 sm:px-6 rounded-[6px] border flex items-center gap-2 transition-all ${
                        isObjActive
                          ? 'bg-indigo-600 text-white border-white/20'
                          : 'bg-white/[0.02] text-zinc-500 border-white/10 hover:text-zinc-300'
                      }`}
                    >
                      {obj.icon}
                      <span className="text-[12px] font-medium">{obj.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <button
              disabled={!isReady}
              onClick={handleContinue}
              className={`h-10 sm:h-11 px-6 sm:px-8 rounded-[6px] flex items-center justify-center text-[14px] sm:text-[15px] font-medium transition-all ${
                isReady
                  ? 'bg-indigo-600 text-white hover:opacity-90'
                  : 'bg-white/[0.04] text-zinc-600 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
