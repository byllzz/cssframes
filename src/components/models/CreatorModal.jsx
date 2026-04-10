import React, { useState, useEffect } from 'react';
import { X, Star, Moon, Sun, Monitor, Rocket  } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

export default function CreatorModal({ category, onClose, onSave, handleStartCreating }) {
  const [activeTab, setActiveTab] = useState('css');
  const [previewBg, setPreviewBg] = useState('#e8e8e8');
  const [tailwindCode, setTailwindCode] = useState('animate-bounce bg-blue-500 rounded-lg');
  const [title, setTitle] = useState('My Awesome Animation');
  const [desc, setDesc] = useState('');
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
    <div className="bg-[#050505]  font-outfit pr-5 relative bottom-10">
      <style>{activeTab === 'css' ? cssCode : ''}</style>
      <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-6 bg-[#050505] shrink-0">
        <div className="flex items-center justify-between w-full gap-6">
          <button
            onClick={onClose}
            className="relative right-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-white hover:bg-[#161616] rounded-[7px] px-4 py-2.5 transition-colors group"
          >
            <svg
              viewBox="0 0 24 24"
              version="1.1"
              height={20}
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#fff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <title>Arrow-Right</title>{' '}
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                  {' '}
                  <g id="Arrow-Right">
                    {' '}
                    <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width={24} height={24}>
                      {' '}
                    </rect>{' '}
                    <line
                      x1="6.5"
                      y1="12"
                      x2="18"
                      y2="12"
                      id="Path"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                    >
                      {' '}
                    </line>{' '}
                    <path
                      d="M10,8 L6.70711,11.2929 C6.31658,11.6834 6.31658,12.3166 6.70711,12.7071 L10,16"
                      id="Path"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {' '}
                    </path>{' '}
                  </g>{' '}
                </g>{' '}
              </g>
            </svg>
            <span className="text-sm font-bold">Go back</span>
          </button>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <div className="flex flex-row items-center gap-3">
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">
              Building
            </span>
            <span className="text-white font-bold text-sm">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
        </div>
      </header>
      {/* main content */}
      <div className="grid grid-cols-1 md:grid-cols-2  overflow-hidden h-[500px]">
        {/*  PREVIEW SIDE */}
        <section
          className="relative flex items-center justify-center group overflow-hidden rounded-tl-[12px] rounded-bl-[12px]"
          style={{ backgroundColor: previewBg }}
        >
          {/* Theme Toggles */}
          <div className="absolute top-3 right-3 flex items-center bg-black backdrop-blur-md p-1.5 rounded-full border border-white/5 shadow-2xl">
            {/* Color Hex Label */}
            <div className="px-3 border-r border-white/10 mr-1.5">
              <span className="text-[11px] font-bold font-heading text-white uppercase tracking-widest">
                {previewBg}
              </span>
            </div>

            {/* Button Group Container */}
            <div className="relative flex gap-1">
              {/* Sliding Highlight */}
              <div
                className="absolute top-0 left-0 h-[28px] rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  width: '28px',
                  transform: `translateX(${
                    previewBg === '#e8e8e8' ? '0px' : previewBg === '#050505' ? '32px' : '64px'
                  })`,
                }}
              />

              {/* Light Mode */}
              <button
                onClick={() => setPreviewBg('#e8e8e8')}
                aria-label="Light Mode"
                className={`relative z-10 w-7 h-7 flex  cursor-pointer items-center justify-center rounded-full transition-colors duration-300 ${
                  previewBg === '#e8e8e8' ? 'text-black' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                <Sun size={14} strokeWidth={2.5} />
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setPreviewBg('#050505')}
                aria-label="Dark Mode"
                className={`relative z-10 w-7 h-7  cursor-pointer flex items-center justify-center rounded-full transition-colors duration-300 ${
                  previewBg === '#050505' ? 'text-black' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                <Moon size={14} strokeWidth={2.5} />
              </button>

              {/* System */}
              <button
                onClick={() => setPreviewBg('#18181b')}
                aria-label="System Mode"
                className={`relative z-10 w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-300 ${
                  previewBg === '#18181b' ? 'text-black' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                <Monitor size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* THE ELEMENT */}
          <style>{activeTab === 'css' ? cssCode : ''}</style>
          <div className="scale-150 transition-transform duration-500">
            <div className={`preview-element ${activeTab === 'tailwind' ? tailwindCode : ''}`}>
              {category === 'box' && (
                <div className="w-16 h-16 bg-[#1d2129] rounded-lg shadow-sm flex items-center justify-center text-white text-[10px]">
                  Button
                </div>
              )}
              {category === 'text' && <span className="text-4xl font-black text-zinc-900">Aa</span>}
              {category === 'circle' && <div className="w-16 h-16 bg-[#1d2129] rounded-full" />}
              {category === 'icon' && <Star size={48} className="text-[#1d2129] fill-current" />}
            </div>
          </div>
        </section>

        {/*editor side */}
        <section className="w-full rounded-tr-[12px] rounded-br-[12px] bg-[#121212] flex flex-col border-l border-zinc-800/50">
          {/* Editor Tabs */}
          <div className="flex bg-[#0a0a0a] rounded-tr-[12px] border-b border-zinc-800/50">
            <button
              onClick={() => setActiveTab('css')}
              className={`flex items-center gap-2 px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'css' ? 'bg-[#121212] text-white border-t-2 border-indigo-500' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <span className="text-orange-500 font-bold">5</span> HTML
            </button>
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`flex items-center gap-2 px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'tailwind' ? 'bg-[#121212] text-white border-t-2 border-indigo-500' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <span className="text-blue-500 font-bold">#</span> CSS
            </button>
          </div>

          {/* Code Area */}
          <div className="flex-1 relative font-mono text-[13px] overflow-hidden">
            {/* Code Editor with Prism Highlighting */}
            <div className="absolute inset-0 p-6 overflow-auto">
              <pre className="pointer-events-none m-0">
                <code className="language-css">{activeTab === 'css' ? cssCode : tailwindCode}</code>
              </pre>
              <textarea
                value={activeTab === 'css' ? cssCode : tailwindCode}
                onChange={e =>
                  activeTab === 'css' ? setCssCode(e.target.value) : setTailwindCode(e.target.value)
                }
                spellCheck="false"
                className="absolute inset-0 w-full h-full p-6 bg-transparent text-transparent caret-white resize-none outline-none overflow-auto"
              />
            </div>
          </div>
        </section>
      </div>
      {/* bottom bar */}
      <footer className="h-16 mt-5 rounded-[8px] bg-[#121212] border-t border-zinc-800/50 flex items-center justify-between pl-3 pr-2 shrink-0">
        <button
          onClick={handleStartCreating}
          className="flex items-center gap-2 text-white text-[15px] cursor-pointer font-medium  transition-colors hover:bg-[#000] py-3 px-4 rounded-[5px]"
        >
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-[1px] opacity-100" />
            ))}
          </div>
          Change type
        </button>

        <div className="flex items-center gap-4">
          <button
            // onClick={() => onSave({ title, cssCode, tailwindCode, category })}
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-[7px] text-[16px] font-bold font-outfit  tracking-wide transition-all active:scale-95 shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <Rocket size={18} />
            Submit for review
          </button>
        </div>
      </footer>
    </div>
  );
}
