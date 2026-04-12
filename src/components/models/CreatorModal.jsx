import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Moon,
  Sun,
  Monitor,
  Rocket,
  Clock,
  Tag,
  AlignLeft,
  ArrowLeft,
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

/**
 * @param {Object} category - This is the object passed from the previous modal: { category: 'Buttons', type: 'box' }
 */
export default function CreatorModal({ category: config, onClose, onSave, handleStartCreating }) {
  // Extracting safe values from the config object
  const animationCategory = config?.category || 'General';
  const objectType = config?.type || 'box';

  const [activeTab, setActiveTab] = useState('css');
  const [previewBg, setPreviewBg] = useState('#e8e8e8');
  const [tailwindCode, setTailwindCode] = useState('animate-bounce rounded-lg');

  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('2s');
  const [errors, setErrors] = useState({});

  const [cssCode, setCssCode] = useState(`/* IMPORTANT: Target the class .preview-element */
.preview-element {
  animation: my-pulse 2s infinite;
}
@keyframes my-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}`);

  useEffect(() => {
    Prism.highlightAll();
  }, [cssCode, tailwindCode, activeTab]);

  const handleTriggerPopup = () => {
    setShowDetailsPopup(true);
  };

  const handleFinalSubmit = () => {
    let newErrors = {};

    if (!title.trim()) newErrors.title = 'Give your animation a name';
    if (!desc.trim()) newErrors.desc = 'Tell us what this does';
    if (!duration.trim()) newErrors.duration = 'Set a duration (e.g. 2s)';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newEntry = {
      title: title,
      desc: desc,
      keyframes: cssCode,
      tailwind: tailwindCode,
      category: animationCategory,
      type: objectType,
      duration: duration,
      isCommunity: true,
      id: `community-${Date.now()}`,
    };

    onSave(newEntry);
    onClose();
  };

  return (
    <div className="bg-[#050505] font-outfit pr-5 relative bottom-10 w-full">
      <style>{activeTab === 'css' ? cssCode : ''}</style>

      {/* FIXED: Passing only the string name to the Header */}
      <Header onClose={onClose} categoryName={animationCategory} />

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden h-[500px]">
        {/* PREVIEW SIDE */}
        <section
          className="relative flex items-center justify-center group overflow-hidden rounded-tl-[12px] rounded-bl-[12px]"
          style={{ backgroundColor: previewBg }}
        >
          {/* Theme Toggles */}
          <div className="absolute top-3 right-3 flex items-center bg-black backdrop-blur-md p-1.5 rounded-full border border-white/5 shadow-2xl">
            <div className="px-3 border-r border-white/10 mr-1.5">
              <span className="text-[11px] font-bold font-heading text-white uppercase tracking-widest">
                {previewBg}
              </span>
            </div>
            <div className="relative flex gap-1">
              <button
                onClick={() => setPreviewBg('#e8e8e8')}
                className={`relative z-10 w-7 h-7 flex items-center justify-center rounded-full ${previewBg === '#e8e8e8' ? 'text-black bg-white' : 'text-zinc-500'}`}
              >
                <Sun size={14} />
              </button>
              <button
                onClick={() => setPreviewBg('#050505')}
                className={`relative z-10 w-7 h-7 flex items-center justify-center rounded-full ${previewBg === '#050505' ? 'text-black bg-white' : 'text-zinc-500'}`}
              >
                <Moon size={14} />
              </button>
              <button
                onClick={() => setPreviewBg('#18181b')}
                className={`relative z-10 w-7 h-7 flex items-center justify-center rounded-full ${previewBg === '#18181b' ? 'text-black bg-white' : 'text-zinc-500'}`}
              >
                <Monitor size={14} />
              </button>
            </div>
          </div>

          {/* THE ANIMATED ELEMENT - Correctly rendering based on objectType */}
          <div className="scale-150 transition-transform duration-500">
            <div className={`preview-element ${activeTab === 'tailwind' ? tailwindCode : ''}`}>
              {objectType === 'box' && <div className="w-16 h-16 bg-[#1d2129] rounded-[5px]" />}
              {objectType === 'text' && (
                <span className="text-4xl font-black text-[#1d2129]">Aa</span>
              )}
              {objectType === 'circle' && <div className="w-16 h-16 bg-[#1d2129] rounded-full" />}
              {objectType === 'icon' && <Star size={48} className="text-[#1d2129] fill-current" />}
            </div>
          </div>
        </section>

        {/* EDITOR SIDE */}
        <section className="w-full rounded-tr-[12px] rounded-br-[12px] bg-[#121212] flex flex-col border-l border-zinc-800/50">
          <div className="flex bg-[#0a0a0a] rounded-tr-[12px] border-b border-zinc-800/50">
            <button
              onClick={() => setActiveTab('css')}
              className={`flex items-center gap-2 px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'css' ? 'bg-[#121212] text-white border-t-2 border-orange-500' : 'text-zinc-500'}`}
            >
              <span className="text-orange-500 font-bold">#</span> CSS Keyframes
            </button>
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`flex items-center gap-2 px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'tailwind' ? 'bg-[#121212] text-white border-t-2 border-blue-500' : 'text-zinc-500'}`}
            >
              <span className="text-blue-500 font-bold">~</span> Tailwind
            </button>
          </div>

          <div className="flex-1 relative font-mono text-[13px] overflow-hidden">
            <textarea
              value={activeTab === 'css' ? cssCode : tailwindCode}
              onChange={e =>
                activeTab === 'css' ? setCssCode(e.target.value) : setTailwindCode(e.target.value)
              }
              spellCheck="false"
              className="absolute inset-0 w-full h-full p-6 bg-transparent text-white caret-white resize-none outline-none overflow-auto"
            />
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="h-16 mt-5 rounded-[8px] bg-[#121212] border-t border-zinc-800/50 flex items-center justify-between pl-3 pr-2 shrink-0">
        <button
          onClick={handleStartCreating}
          className="flex items-center gap-2 text-white text-[15px] cursor-pointer font-medium transition-colors hover:bg-[#000] py-3 px-4 rounded-[5px]"
        >
          <AlignLeft size={18} />
          Change Category
        </button>

        <button
          onClick={handleTriggerPopup}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-[7px] text-[16px] font-bold tracking-wide transition-all active:scale-95 cursor-pointer"
        >
          <Rocket size={18} />
          Submit to Community
        </button>
      </footer>

      {/* --- DETAILS VALIDATION POPUP --- */}
      {showDetailsPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowDetailsPopup(false)}
          />
          <div className="relative bg-[#121212] border border-zinc-800 w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Tag className="text-indigo-500" size={20} /> Finalize Animation
              </h3>
              <button
                onClick={() => setShowDetailsPopup(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">
                  Animation Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Hyper Glow Pulse"
                  className={`w-full bg-[#090909] border ${errors.title ? 'border-red-500' : 'border-zinc-800'} rounded-lg py-3 px-4 text-white text-sm outline-none focus:border-indigo-500`}
                />
                {errors.title && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase">
                    {errors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">
                  Description
                </label>
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className={`w-full bg-[#090909] border ${errors.desc ? 'border-red-500' : 'border-zinc-800'} rounded-lg py-3 px-4 text-white text-sm h-24 resize-none`}
                />
                {errors.desc && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase">
                    {errors.desc}
                  </p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">
                  Default Duration
                </label>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    size={16}
                  />
                  <input
                    type="text"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className={`w-full bg-[#090909] border ${errors.duration ? 'border-red-500' : 'border-zinc-800'} rounded-lg py-3 pl-10 pr-4 text-white text-sm`}
                  />
                </div>
              </div>
              <button
                onClick={handleFinalSubmit}
                className="w-full bg-white text-black font-black uppercase py-4 rounded-xl mt-4 hover:bg-indigo-500 hover:text-white transition-all"
              >
                Publish to Community
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * FIXED HEADER: handles categoryName as a string safely.
 */
function Header({ onClose, categoryName }) {
  const safeTitle =
    typeof categoryName === 'string'
      ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      : 'Animation';

  return (
    <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-6 bg-[#050505] shrink-0">
      <div className="flex items-center justify-between w-full gap-6">
        <button
          onClick={onClose}
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-white hover:bg-[#161616] rounded-[7px] px-4 py-2.5 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Go back</span>
        </button>
        <div className="h-4 w-[1px] bg-zinc-800" />
        <div className="flex flex-row items-center gap-3">
          <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">
            Building
          </span>
          <span className="text-white font-bold text-sm">{safeTitle}</span>
        </div>
      </div>
    </header>
  );
}
