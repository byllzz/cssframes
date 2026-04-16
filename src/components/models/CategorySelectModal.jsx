import React, { useState , useEffect} from 'react';
import {
  X,
  MousePointer2,
  Loader2,
  LogIn,
  Zap,
  CreditCard,
  Move3d,
  Type,
  Sparkles,
  Shapes,
  Monitor,
  Box,

  Square,
  Circle,
  Star,
} from 'lucide-react';

export default function CategorySelectModal({ onSelect, onClose }) {
  const [selectedId, setSelectedId] = useState(null);
  const [objectType, setObjectType] = useState(null);

  const categories = [
    { id: 'Buttons', name: 'Button Animation', icon: <MousePointer2 size={22} /> },
    { id: 'Loaders', name: 'Loader Animation', icon: <Loader2 size={22} /> },
    { id: 'Arrival', name: 'Entrance Animation', icon: <LogIn size={22} /> },
    { id: 'Transitions', name: 'Transition Animation', icon: <Zap size={22} /> },
    { id: 'Cards', name: 'Card Animation', icon: <CreditCard size={22} /> },
    { id: 'Text', name: 'Text Animation', icon: <Type size={22} /> },
    { id: 'Icons', name: 'Icon Animation', icon: <Sparkles size={22} /> },
    { id: 'Shapes', name: 'Shape Animation', icon: <Shapes size={22} /> },
    { id: 'Scroll', name: 'Scroll Animation', icon: <Monitor size={22} /> },
    { id: 'Components', name: 'Component Animation', icon: <Box size={22} /> },
  ];

  const objectTypes = [
    { id: 'box', name: 'Box', icon: <Square size={14} /> },
    { id: 'circle', name: 'Circle', icon: <Circle size={14} /> },
    { id: 'text', name: 'Text', icon: <Type size={14} /> },
    { id: 'icon', name: 'Icon', icon: <Star size={14} /> },
  ];

  const isReady = selectedId && objectType;

  const handleContinue = () => {
    if (!isReady) return;
    onSelect({
      category: selectedId,
      type: objectType,
    });
  };

  const [showGuide, setShowGuide] = useState(true);
  useEffect(() => {
    if (selectedId || objectType) {
      setShowGuide(false);
    }
  }, [selectedId, objectType]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4 font-outfit">
      <div className="relative w-full max-w-[1000px] rounded-[12px]  bg-[#0b0b0c] overflow-hidden ">
        {/* top subtle line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-all"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-7">
          {showGuide && (
            <div className="absolute right-10 top-14 max-w-md mb-6 rounded-[8px] border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
              <div className="mt-0.5">
                <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-white text-[11px] font-semibold">
                  i
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-white mb-1">Quick guide</h3>

                <p className="text-[13px] text-zinc-400 leading-5">
                  Choose a <span className="text-white">category</span> to define the animation
                  type, and a <span className="text-white">base object</span> to decide what preview
                  element appears in the editor. Both are required so the editor knows what motion
                  to generate and what object to animate.
                </p>
              </div>

              {/* <button
                onClick={() => setShowGuide(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button> */}
            </div>
          )}
          {/* Header */}
          <header className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-3">
              cssframes
            </p>
            <h2 className="text-[34px] md:text-[40px] font-semibold tracking-tight text-white leading-none">
              Create animation preset
            </h2>
            <p className="text-zinc-500 text-[14px] mt-3 max-w-[420px] leading-5">
              Choose a category and base object. Keep it simple, because apparently elegance
              requires more discipline than most design teams can handle.
            </p>
          </header>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {categories.map(cat => {
              const isActive = selectedId === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedId(cat.id)}
                  className={`rounded-[5px] border p-5 text-left cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.04] border-indigo-600 bg-indigo-600 scale-98'
                      : 'bg-white/[0.02] border-white/30 hover:border-white/10'
                  }`}
                >
                  <div className={`mb-4 ${isActive ? 'text-indigo-600' : 'text-zinc-500'}`}>
                    {cat.icon}
                  </div>

                  <p
                    className={`text-[13px] font-medium leading-5 ${
                      isActive ? 'text-indigo-600' : 'text-zinc-400'
                    }`}
                  >
                    {cat.name}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/5 pt-8">
            {/* Object types */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-3">
                Base object (Important)
              </p>

              <div className="flex flex-wrap gap-2">
                {objectTypes.map(obj => {
                  const isObjActive = objectType === obj.id;

                  return (
                    <button
                      key={obj.id}
                      onClick={() => setObjectType(obj.id)}
                      className={`h-11 px-6 rounded-[5px] cursor-pointer border flex items-center gap-2 transition-all ${
                        isObjActive
                          ? 'border-white/20 bg-indigo-600 text-white'
                          : 'border-white/5 bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {obj.icon}
                      <span className="text-[12px] font-medium capitalize">{obj.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <button
              disabled={!isReady}
              onClick={handleContinue}
              className={`h-11 px-8 rounded-[5px] flex cursor-pointer items-center gap-2 text-[15px] font-medium transition-all ${
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
