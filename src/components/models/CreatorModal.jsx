import React, { useState, useEffect } from 'react';
import { X, Code2, MonitorPlay, ChevronRight, Star, Send } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

export default function CreatorModal({ category, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('css');
const [cssCode, setCssCode] = useState(`/* IMPORTANT: Target the class .preview-element */

.preview-element {
  animation: my-pulse 2s infinite;
}

@keyframes my-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}`);

  const [tailwindCode, setTailwindCode] = useState("animate-bounce bg-blue-500 rounded-lg");
  const [title, setTitle] = useState("My Awesome Animation");
  const [desc, setDesc] = useState('');

  // Live syntax highlighting
  useEffect(() => {
    Prism.highlightAll();
  }, [cssCode, tailwindCode, activeTab]);

  const handleSubmit = () => {
    const newEntry = {
      title: title || 'Untitled Animation',
      desc: desc || 'A custom community-created animation.',
      keyframes: cssCode,
      tailwind: tailwindCode,
      type: category, // box, text, circle, icon
      duration: '2s',
      isCommunity: true,
      id: Date.now().toString(), // Ensure you have a unique ID for React keys
    };
    onSave(newEntry);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#050505] w-full h-full flex flex-col gap-4 py-6 px-4 md:px-8 md:py-8 animate-in slide-in-from-bottom-8 duration-500 overflow-y-auto scrollbar-hide">

      {/* Live Style Injection: Forces user to target .preview-element */}
      <style>{activeTab === 'css' ? cssCode : ''}</style>

      {/* Header section */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="text-white flex items-center gap-2 hover:bg-zinc-800 transition-colors h-10 rounded-lg px-3">
            <X size={20} />
            <span className="font-medium hidden sm:inline">Cancel</span>
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-white font-bold text-xl border-b border-dashed border-zinc-700 outline-none focus:border-blue-500 px-2 py-1 min-w-[200px]"
            placeholder="Animation Name..."
          />
        </div>

        <button onClick={handleSubmit} className="bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors h-10 rounded-lg px-6 font-bold shadow-lg shadow-blue-900/20">
          <Send size={16} />
          Publish to Community
        </button>
      </div>

      {/* Description Area (Moved out of header for better layout) */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest ml-1">Short Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full bg-[#121212] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 outline-none focus:border-zinc-600 transition-colors h-14 resize-none"
          placeholder="Briefly describe your animation effect..."
        />
      </div>

      {/* Main Split View */}
      <div className="w-full rounded-xl border border-zinc-800 overflow-hidden shadow-2xl flex flex-col md:flex-row flex-1 min-h-[500px]">

        {/* LEFT SIDE: Live Preview */}
        <div className="w-full md:w-1/2 bg-[#fdfdfd] relative flex flex-col items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 100%' }} />

          <div className="relative z-10 scale-125 md:scale-150">
            {/* The 'preview-element' class is what the user should target in CSS */}
            <div className={`preview-element ${activeTab === 'tailwind' ? tailwindCode : ''}`}>
              {category === 'box' && <div className="w-16 h-16 bg-blue-600 rounded-2xl shadow-xl" />}
              {category === 'text' && <h1 className="text-6xl font-black text-zinc-900 tracking-tighter">Aa</h1>}
              {category === 'circle' && <div className="w-16 h-16 bg-blue-600 rounded-full shadow-xl" />}
              {category === 'icon' && <Star className="text-blue-600 w-16 h-16 fill-current" />}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/90 text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-md border border-white/10">
            Previewing: {category}
          </div>
        </div>

        {/* RIGHT SIDE: Code Editor */}
        <div className="w-full md:w-1/2 flex flex-col bg-[#1e1e1e]">
          {/* Tab Header */}
          <div className="h-10 flex items-center bg-[#252526] shrink-0">
            <button
              onClick={() => setActiveTab('css')}
              className={`h-full px-6 flex items-center gap-2 text-[12px] transition-colors ${activeTab === 'css' ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Code2 size={14} />
              <span>CSS Keyframes</span>
            </button>
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`h-full px-6 flex items-center gap-2 text-[12px] transition-colors ${activeTab === 'tailwind' ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <MonitorPlay size={14} />
              <span>Tailwind Classes</span>
            </button>
          </div>

          <div className="h-7 bg-[#1e1e1e] flex items-center px-4 gap-2 text-[11px] text-zinc-500 border-b border-black/20 shrink-0">
            <span>src</span>
            <ChevronRight size={10} />
            <span className="text-zinc-300">{activeTab === 'css' ? 'animation.css' : 'tailwind.config.js'}</span>
          </div>

          {/* Editor Area */}
          <div className="relative flex-1 font-mono text-[13px] leading-6 overflow-hidden">
            <div className="absolute inset-0 p-4 overflow-auto">
                <pre className="pointer-events-none m-0">
                  <code className={`language-${activeTab === 'css' ? 'css' : 'javascript'}`}>
                    {activeTab === 'css' ? cssCode : tailwindCode}
                  </code>
                </pre>
                <textarea
                  value={activeTab === 'css' ? cssCode : tailwindCode}
                  onChange={(e) => activeTab === 'css' ? setCssCode(e.target.value) : setTailwindCode(e.target.value)}
                  spellCheck="false"
                  className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none outline-none whitespace-pre overflow-auto selection:bg-blue-500/30"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
