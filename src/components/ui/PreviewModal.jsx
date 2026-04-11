import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  BookmarkIcon,
  Code2,
  Star,
  Moon,
  Sun,
  Monitor,
  X
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

export default function PreviewModal({ animation, onClose, previewType }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('css');
  const [editedCode, setEditedCode] = useState('');
  const [previewBg, setPreviewBg] = useState('#e8e8e8');

  const uniqueId = animation?.id?.replace(/[^a-zA-Z0-9]/g, '') || 'default';
  const modalAnimName = `exec-${uniqueId}`;

  // Sync edited code when animation or tab changes
  useEffect(() => {
    setEditedCode(activeTab === 'css' ? animation?.keyframes || '' : animation?.tailwind || '');
  }, [animation, activeTab]);

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

  const displayType = animation.isCommunity ? animation.type : previewType;

  return (
    <div className="w-full h-full flex flex-col text-zinc-300 font-outfit overflow-y-auto rounded-[12px] relative bottom-7 pr-5">
      <style>{getStyleSheet()}</style>

      <Header onClose={onClose} />

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
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
              <div
                className="absolute top-0 left-0 h-[28px] rounded-full bg-white transition-all duration-300"
                style={{
                  width: '28px',
                  transform: `translateX(${
                    previewBg === '#e8e8e8' ? '0px' : previewBg === '#050505' ? '32px' : '64px'
                  })`,
                }}
              />
              <button onClick={() => setPreviewBg('#e8e8e8')} className={`relative z-10 w-7 h-7 flex cursor-pointer items-center justify-center rounded-full transition-colors ${previewBg === '#e8e8e8' ? 'text-black' : 'text-zinc-500'}`}>
                <Sun size={14} strokeWidth={2.5} />
              </button>
              <button onClick={() => setPreviewBg('#050505')} className={`relative z-10 w-7 h-7 flex cursor-pointer items-center justify-center rounded-full transition-colors ${previewBg === '#050505' ? 'text-black' : 'text-zinc-500'}`}>
                <Moon size={14} strokeWidth={2.5} />
              </button>
              <button onClick={() => setPreviewBg('#18181b')} className={`relative z-10 w-7 h-7 flex cursor-pointer items-center justify-center rounded-full transition-colors ${previewBg === '#18181b' ? 'text-black' : 'text-zinc-500'}`}>
                <Monitor size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Actual Animated Element */}
          <div className={`modal-preview-target ${activeTab === 'tailwind' ? editedCode : ''}`}>
            <div className="flex items-center justify-center scale-150">
              {displayType === 'text' && <h1 className="text-4xl font-black text-black tracking-tighter italic">Aa</h1>}
              {displayType === 'box' && <div className="w-16 h-16 bg-black rounded-[5px] shadow-2xl" />}
              {displayType === 'circle' && <div className="w-16 h-16 bg-black rounded-full shadow-xl" />}
              {displayType === 'icon' && <Star size={48} className="fill-black text-black" />}
            </div>
          </div>
        </section>

        {/* EDITOR SIDE - Matching CreatorModal exactly */}
        <section className="w-full rounded-tr-[12px] rounded-br-[12px] bg-[#121212] flex flex-col border-l border-zinc-800/50 relative">

          {/* Tabs */}
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

          {/* Copy Button Overlay */}
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 z-20 flex items-center gap-2 py-1.5 px-4 rounded-[5px] text-[11px] font-bold text-white border border-white/5 bg-[#0a0a0a] hover:bg-zinc-800 transition-colors shadow-xl"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          {/* Textarea Area */}
          <div className="flex-1 relative font-mono text-[13px] overflow-hidden">
            <textarea
              value={editedCode}
              onChange={(e) => setEditedCode(e.target.value)}
              spellCheck="false"
              className="absolute inset-0 w-full h-full p-6 bg-transparent text-white caret-white resize-none outline-none overflow-auto font-mono leading-relaxed"
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              }}
            />
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-2 bg-[#0c0c0c] border-t mt-3 border-zinc-900 flex items-center justify-between rounded-[12px]">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 cursor-pointer px-4 py-3 text-white hover:bg-[#161616] rounded-[5px] text-[15px] transition-colors">
            <BookmarkIcon size={20} /> Save to favorites
          </button>
        </div>
        <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest px-4">
          ID: {uniqueId}
        </div>
      </div>
    </div>
  );
}

function Header({ onClose }) {
  return (
    <div className="flex items-center justify-between h-13 mb-2">
      <button
        onClick={onClose}
        className="flex cursor-pointer items-center gap-2 text-sm font-medium text-white hover:bg-[#161616] rounded-[7px] px-4 py-2.5 transition-all group"
      >
        <X size={18} />
        <span className="text-sm font-bold">Go back</span>
      </button>
      <div className="flex items-center gap-4">
        <span className="text-xs text-zinc-500 font-black uppercase tracking-[0.2em]">
          Preview <span className="text-zinc-200">Animation</span>
        </span>
      </div>
    </div>
  );
}
