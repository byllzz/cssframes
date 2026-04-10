import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  BookmarkIcon,
  Code2,
  ChevronRight,
  Star,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

export default function PreviewModal({ animation, onClose, previewType }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('css');
  const [editedCode, setEditedCode] = useState('');
  const [previewBg, setPreviewBg] = useState('#e8e8e8'); 

  const uniqueId = animation.id.replace(/[^a-zA-Z0-9]/g, '');
  const modalAnimName = `exec-${uniqueId}`;

  useEffect(() => {
    setEditedCode(activeTab === 'css' ? animation.keyframes || '' : animation.tailwind || '');
  }, [animation, activeTab]);

  useEffect(() => {
    Prism.highlightAll();
  }, [editedCode, activeTab]);

  if (!animation) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(editedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStyleSheet = () => {
    if (activeTab === 'tailwind' || !editedCode) return '';
    const keyframeRegex = /@keyframes\s+([\w-]+)/;
    const match = editedCode.match(keyframeRegex);
    const actualNameInCode = match ? match[1] : null;

    let processedCSS = editedCode;
    if (actualNameInCode) {
      processedCSS = editedCode.replace(new RegExp(actualNameInCode, 'g'), modalAnimName);
    }

    return `
      ${processedCSS}
      .modal-preview-target {
        animation: ${modalAnimName} ${animation.duration || '2s'} ease-in-out infinite !important;
      }
    `;
  };

  return (
    <div className="w-full h-full flex flex-col text-zinc-300 font-outfit overflow-y-auto  rounded-[12px] relative bottom-7 pr-5">
      <style>{getStyleSheet()}</style>

      {/* Top Navbar Style Header */}
      <div className="flex items-center justify-between h-13">
        <button
          onClick={onClose}
          className="flex cursor-pointer items-center gap-1 text-sm font-medium text-white hover:bg-[#161616] rounded-[7px] px-4 py-2.5 transition-colors"
        >
          <span>
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
          </span>
          Go back
        </button>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 font-medium">
            Preview <span className="text-zinc-200">Animation</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[505px] ">
        {/*  Preview Area*/}
        <div
          className="relative flex-1 flex flex-col items-center justify-center min-h-[400px] rounded-tl-[12px] rounded-bl-[12px]"
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

          {/* Actual Animated Element */}
          <div className={`modal-preview-target ${activeTab === 'tailwind' ? editedCode : ''}`}>
            {animation.type === 'box' || animation.isCommunity ? (
              <button className="px-8  cursor-pointer py-3 bg-[#1d2129] text-white rounded-[40px] font-bold text-sm flex items-center gap-4 shadow-xl border-none">
                let's go!
                <div className="w-8 h-8 rounded-full bg-[#f59aff] flex items-center justify-center text-black">
                  <ChevronRight size={16} strokeWidth={4} />
                </div>
              </button>
            ) : (
              <div className="text-5xl font-black text-[#1d2129]">
                {previewType === 'box' && (
                  <div className="w-12 h-12 bg-black rounded-[8px] shadow-md" />
                )}
                {previewType === 'text' && (
                  <h1 className="text-5xl font-black text-zinc-900 tracking-tighter">Aa</h1>
                )}
                {previewType === 'circle' && (
                  <div className="w-12 h-12 bg-black rounded-full shadow-md" />
                )}
                {previewType === 'icon' && (
                  <Star size={42} className="fill-blue-600 text-blue-600" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* editor area */}
        <div className="rounded-tr-[12px] rounded-br-[12px] flex flex-col">
          {/* Tab Bar */}
          <div className="flex items-center justify-between px-2 h-14">
            <div className="flex h-full gap-1 p-2">
              <button
                onClick={() => setActiveTab('css')}
                className={`flex items-center gap-2 px-6 rounded-[5px] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'css' ? 'bg-[#1d2129] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Monitor size={14} /> CSS
              </button>
              <button
                onClick={() => setActiveTab('tailwind')}
                className={`flex items-center gap-2 px-6 rounded-[5px] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'tailwind' ? 'bg-[#1d2129] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Code2 size={14} /> Tailwind
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="mr-2 flex items-center gap-2 py-1.5 px-4 rounded-[5px] text-[11px] font-bold text-white border border-white/5"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Code View */}
          <div className="flex-1 relative font-mono text-[13px] leading-6  overflow-hidden">
            <div className="flex h-full overflow-auto">
              <div className="w-12 bg-[#0c0c0c] flex flex-col items-center pt-6 text-zinc-700 select-none border-r border-zinc-900/50">
                {(editedCode || '').split('\n').map((_, i) => (
                  <span key={i} className="h-6">
                    {i + 1}
                  </span>
                ))}
              </div>
              <div className="relative flex-1">
                <pre className="p-6 m-0 pointer-events-none">
                  <code className={`language-${activeTab === 'css' ? 'css' : 'javascript'}`}>
                    {editedCode}
                  </code>
                </pre>
                <textarea
                  value={editedCode}
                  onChange={e => setEditedCode(e.target.value)}
                  spellCheck="false"
                  className="absolute inset-0 w-full h-full p-6 bg-transparent text-transparent caret-indigo-500 resize-none outline-none whitespace-pre"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-[#0c0c0c] border-t mt-3 border-zinc-900 flex items-center justify-between rounded-[12px]">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 cursor-pointer px-4 py-3 text-white hover:bg-[#161616] rounded-[5px] text-[15px]">
            <BookmarkIcon size={20} /> Save to favorites
          </button>
        </div>
      </div>
    </div>
  );
}
