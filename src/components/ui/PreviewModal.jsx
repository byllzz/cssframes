import React, { useState, useEffect } from 'react';
import { X, Copy, Check, BookmarkIcon, MonitorPlay, Code2, ChevronRight, Star } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import DetailsSection from '../DetailsSection';

// --- Custom Icons ---
const CssIcon = ({ height = 18 }) => (
  <svg viewBox="0 0 32 32" height={height} xmlns="http://www.w3.org/2000/svg">
    <polygon points="5.902 27.201 3.656 2 28.344 2 26.095 27.197 15.985 30 5.902 27.201" fill="#1572B6" />
    <polygon points="16 27.858 24.17 25.593 26.092 4.061 16 4.061 16 27.858" fill="#33A9DC" />
    <path d="M16 13.191h4.09l.282-3.165H16V6.935h7.75l-.074.829-.759 8.518H16v-3.091z" fill="#FFFFFF" />
    <path d="M16.019 21.218l-.014.004-3.442-.93-.22-2.465H9.24l.433 4.853 6.331 1.758.015-.004v-3.216z" fill="#EBEBEB" />
    <path d="M19.827 16.151l-.372 4.139-3.447.93v3.216l6.336-1.756.047-.522.537-6.007h-3.101z" fill="#FFFFFF" />
    <path d="M16.011 6.935v3.091H8.555l-.072-.829L8.268 6.935h7.743z" fill="#EBEBEB" />
    <path d="M16 13.191v3.091h-3.389l-.072-.829-.14-1.567-.074-.829H16z" fill="#EBEBEB" />
  </svg>
);

const TailwindIcon = ({ height = 20 }) => (
  <svg viewBox="0 0 32 32" height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z" fill="#38BDF8" />
  </svg>
);

export default function PreviewModal({ animation, onClose, previewType }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('css');
  const [editedCode, setEditedCode] = useState('');

  const displayType = animation.isCommunity ? animation.type : previewType;
  const uniqueId = animation.id.replace(/[^a-zA-Z0-9]/g, '');
  const modalAnimName = `modal-exec-${uniqueId}`;

  useEffect(() => {
    if (animation.isCommunity && animation.tailwind && !animation.keyframes) {
      setActiveTab('tailwind');
    }
  }, [animation]);

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

    // 1. Find the actual name used after @keyframes in the code
    const keyframeRegex = /@keyframes\s+([\w-]+)/;
    const match = editedCode.match(keyframeRegex);
    const actualNameInCode = match ? match[1] : null;

    let processedCSS = editedCode;

    if (actualNameInCode) {
      // 2. Replace the detected name with our unique modal name
      processedCSS = editedCode.replace(new RegExp(actualNameInCode, 'g'), modalAnimName);
    } else if (animation.isCommunity) {
      // Fallback for community items if regex fails
      processedCSS = editedCode.replace(/my-anim/g, modalAnimName);
    }

    return `
      ${processedCSS}
      .modal-preview-element {
        animation: ${modalAnimName} ${animation.duration || '2s'} ease-in-out infinite !important;
      }
    `;
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 py-6 px-4 md:px-8 md:py-8 animate-in fade-in duration-300 relative top-5">
      <style>{getStyleSheet()}</style>

      {/* Header */}
      <div className="w-full flex items-center justify-between shrink-0 mb-2">
        <button
          onClick={onClose}
          className="text-white flex items-center gap-2 cursor-pointer hover:bg-zinc-800 transition-colors h-10 rounded-lg px-4"
        >
          <ChevronRight className="rotate-180" size={20} />
          <span className="text-[15px] font-medium">Go Back</span>
        </button>
      </div>

      {/* Main Split View */}
      <div className="w-full rounded-[12px] border border-zinc-800 overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[520px] shrink-0 bg-[#1e1e1e]">

        {/* LEFT SIDE: Visual Preview */}
        <div className="w-full md:flex-1 min-h-[350px] md:min-h-0 bg-[#fdfdfd] relative flex flex-col items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 100%' }} />

          <div className="relative z-10 scale-125 md:scale-150">
            <div className={`preview-element modal-preview-element ${activeTab === 'tailwind' ? editedCode : ''}`}>
              {displayType === 'box' && <div className="w-16 h-16 bg-blue-600 rounded-2xl shadow-2xl" />}
              {displayType === 'text' && <h1 className="text-6xl font-black text-zinc-900 tracking-tighter">Aa</h1>}
              {displayType === 'circle' && <div className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl" />}
              {displayType === 'icon' && <Star className="text-blue-600 w-16 h-16 fill-current" />}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-white/10">
            {animation.isCommunity ? 'Community Creation' : 'Core Library'}
          </div>
        </div>

        {/* RIGHT SIDE: Code Editor */}
        <div className="w-full md:flex-1 flex flex-col">
          <div className="h-10 flex items-center bg-[#252526] shrink-0">
            <button
              onClick={() => setActiveTab('css')}
              className={`h-full px-4 flex items-center gap-2 text-[12px] transition-colors border-r border-zinc-900/50 ${activeTab === 'css' ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500' : 'bg-[#2d2d2d] text-zinc-500 hover:text-zinc-300'}`}
            >
              <CssIcon height={14} />
              <span>animation.css</span>
            </button>
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`h-full px-4 flex items-center gap-2 text-[12px] transition-colors border-r border-zinc-900/50 ${activeTab === 'tailwind' ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500' : 'bg-[#2d2d2d] text-zinc-500 hover:text-zinc-300'}`}
            >
              <TailwindIcon height={16} />
              <span>tailwind.config.js</span>
            </button>
          </div>

          <div className="h-7 bg-[#1e1e1e] flex items-center px-4 gap-2 text-[11px] text-zinc-500 border-b border-black/20 shrink-0">
            <span>src</span> <ChevronRight size={10} />
            <span>styles</span> <ChevronRight size={10} />
            <span className="text-zinc-300">{activeTab === 'css' ? 'animation.css' : 'tailwind.config.js'}</span>
          </div>

          <div className="relative flex-1 font-mono text-[13px] leading-6 overflow-hidden">
            <div className="absolute top-3 right-3 z-20">
              <button
                onClick={handleCopy}
                className="text-white flex items-center gap-2 py-1.5 px-3 rounded text-xs bg-black/80 hover:bg-black border border-zinc-800 transition-all"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex h-full">
              <div className="w-12 bg-[#1e1e1e] border-r border-zinc-800/50 flex flex-col items-center pt-4 text-[12px] text-zinc-600 select-none">
                {editedCode.split('\n').map((_, i) => (
                  <span key={i} className="h-6">{i + 1}</span>
                ))}
              </div>

              <div className="relative flex-1">
                <pre className="absolute inset-0 p-4 pointer-events-none m-0 overflow-auto scrollbar-hide">
                  <code className={`language-${activeTab === 'css' ? 'css' : 'javascript'}`}>
                    {editedCode}
                  </code>
                </pre>
                <textarea
                  value={editedCode}
                  onChange={e => setEditedCode(e.target.value)}
                  spellCheck="false"
                  className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none outline-none overflow-auto scrollbar-hide whitespace-pre"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full bg-[#121212] rounded-[8px] px-3 py-2 border border-zinc-800/50 shrink-0 mt-2">
        <button className="text-white flex items-center gap-2 hover:bg-zinc-800 transition-colors rounded-md h-10 px-4">
          <BookmarkIcon size={18} />
          <span className="font-medium text-sm">Save to favorites</span>
        </button>
      </div>

      <div className="w-full shrink-0">
        <DetailsSection animation={animation} />
      </div>
    </div>
  );
}
