import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import prettier from 'prettier/standalone';
import parserPostcss from 'prettier/parser-postcss';
import { FaArrowLeftLong, FaCss3 } from 'react-icons/fa6';
import {
  Copy,
  Check,
  BookmarkIcon,
  Star,
  Moon,
  Sun,
  Clock,
} from 'lucide-react';

export default function PreviewModal({ animation, onClose, previewType }) {
  const [copied, setCopied] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [previewBg, setPreviewBg] = useState(animation?.previewBg || '#e8e8e8');
  const formatTimer = useRef(null);

  // Priority logic for the object type: if a user has selected "Circle" in
  // the toolbar, the page opens with "Circle" regardless of the card's default.
  const displayType = previewType || animation?.type || 'box';

  // Reacts to the animation prop changing (a new animation was opened) to
  // reset scroll and sync the preview background — external, parent-driven
  // state, not derivable during render.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (animation?.previewBg) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewBg(animation.previewBg);
    }
  }, [animation]);

  const uniqueId = animation?.id?.replace(/[^a-zA-Z0-9]/g, '') || 'default';
  const modalAnimName = `exec-${uniqueId}`;

  useEffect(() => {
    const formatInitial = async () => {
      const raw = animation?.keyframes || '';
      try {
        const formatted = await prettier.format(raw, {
          parser: 'css',
          plugins: [parserPostcss],
        });
        setEditedCode(formatted);
      } catch (e) {
        console.error('Failed to format initial keyframes:', e);
        setEditedCode(raw);
      }
    };
    formatInitial();
  }, [animation]);

  if (!animation) return null;

  const isDarkBg = previewBg !== '#e8e8e8' && previewBg !== '#ffffff';

  const handleCopy = () => {
    navigator.clipboard.writeText(editedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditorChange = (value) => {
    const raw = value || '';
    setEditedCode(raw);
    if (formatTimer.current) clearTimeout(formatTimer.current);
    formatTimer.current = setTimeout(async () => {
      try {
        const formatted = await prettier.format(raw, {
          parser: 'css',
          plugins: [parserPostcss],
        });
        setEditedCode(formatted);
      } catch (e) {
        // User is likely mid-edit with invalid CSS — leave their text as-is
        // rather than clobbering it, just note why formatting was skipped.
        console.warn('Skipped formatting invalid CSS while editing:', e);
      }
    }, 600);
  };

  const getStyleSheet = () => {
    if (!editedCode) return '';
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
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  };

  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col text-white font-outfit">
      <style>{getStyleSheet()}</style>

      {/* Top bar */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 -ml-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
        >
          <FaArrowLeftLong size={18} />
          <span className="text-[14px] font-medium">Back</span>
        </button>
        <span className="text-[13px] text-white/40 font-medium">
          {animation.category} · Animation
        </span>
      </div>

      {/* Main panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 w-full min-h-0 rounded-[16px] overflow-hidden border border-white/10">
        {/* Preview */}
        <section
          className="relative flex items-center justify-center min-h-[440px] transition-colors duration-500"
          style={{ backgroundColor: previewBg }}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3 z-20">
            <span className={`text-[13px] font-mono-jb ${!isDarkBg ? 'text-black/60' : 'text-white/60'}`}>
              {previewBg}
            </span>
            <div className={`relative flex items-center ${!isDarkBg ? 'bg-black/10' : 'bg-white/10'} p-1 rounded-full w-12 h-6.5`}>
              <label
                htmlFor="themeToggle"
                className="absolute cursor-pointer top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300"
                style={{ transform: !isDarkBg ? 'translateX(0px)' : 'translateX(22px)' }}
              />
              <input
                id="themeToggle"
                type="checkbox"
                className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                checked={isDarkBg}
                onChange={e => setPreviewBg(e.target.checked ? '#161616' : '#e8e8e8')}
              />
              <div className="flex w-full justify-between px-1 pointer-events-none">
                <Sun size={10} className={!isDarkBg ? 'text-black/50' : 'text-white/30'} />
                <Moon size={10} className={isDarkBg ? 'text-black/50' : 'text-white/30'} />
              </div>
            </div>
            <input
              type="color"
              value={previewBg}
              onChange={e => setPreviewBg(e.target.value)}
              className="h-6.5 w-6.5 cursor-pointer rounded-md border-none bg-transparent"
            />
          </div>

          <div className="modal-preview-target">
            <div className="scale-[2.0] lg:scale-[2.5]">
              {displayType === 'text' && (
                <h1 className={`text-4xl font-black tracking-tighter italic ${isDarkBg ? 'text-white' : 'text-black'}`}>
                  Aa
                </h1>
              )}
              {displayType === 'box' && (
                <div className={`w-12 h-12 rounded-xl ${isDarkBg ? 'bg-white' : 'bg-black'}`} />
              )}
              {displayType === 'circle' && (
                <div className={`w-12 h-12 rounded-full ${isDarkBg ? 'bg-white' : 'bg-black'}`} />
              )}
              {displayType === 'icon' && (
                <Star size={40} className={`${isDarkBg ? 'text-white fill-white' : 'text-black fill-black'}`} />
              )}
            </div>
          </div>
        </section>

        {/* Code editor */}
        <section className="flex flex-col bg-[#0d0d0d] border-t lg:border-t-0 lg:border-l border-white/10 min-h-[400px] lg:min-h-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-white/50">
              <FaCss3 size={15} />
              <span className="text-[13px] font-semibold tracking-tight">CSS</span>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-[12px] font-medium transition-colors ${
                copied ? 'bg-[#7c3aed] text-[#fff]' : 'bg-white/5 hover:bg-white/10 text-white/80'
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language="css"
              theme="vs-dark"
              value={editedCode}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                padding: { top: 16 },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </section>
      </div>

      {/* Save action - for future */}
      {/* <div className="w-full flex justify-start mt-3">
        <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <BookmarkIcon size={16} />
          Save favorite
        </button>
      </div> */}

      {/* Title & meta */}
      <div className="w-full mt-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {animation.title}
        </h2>
        <p className="text-white/50 text-[15px] max-w-[520px] leading-relaxed mt-3">
          {animation.desc}
        </p>
        <div className="flex items-center gap-2 text-white/40 mt-4 text-[13px]">
          <Clock size={14} />
          <span>Duration: {animation.duration}</span>
        </div>
      </div>
    </div>
  );
}
