import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import prettier from 'prettier/standalone';
import parserPostcss from 'prettier/parser-postcss';
import { FaCss3 } from 'react-icons/fa6';
import {
  Copy,
  Check,
  BookmarkIcon,
  ArrowLeft,
  Star,
  Moon,
  Sun,
  Clock,
} from 'lucide-react';

export default function PreviewModal({ animation, onClose, previewType }) {
  const [copied, setCopied] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [previewBg, setPreviewBg] = useState('#e8e8e8');
  const formatTimer = useRef(null);

  // SCROLL TO TOP LOGIC
  useEffect(() => {
    // This ensures that when the modal opens or a new animation is selected,
    // the view jumps to the top immediately.
    window.scrollTo({ top: 0, behavior: 'instant' });
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
      } catch {
        setEditedCode(raw);
      }
    };
    formatInitial();
  }, [animation]);

  if (!animation) return null;

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
      } catch {}
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
      }
    `;
  };

  const displayType = animation.isCommunity ? animation.type : previewType;

  return (
    <>
      <div className="relative bottom-8 w-full max-w-7xl mx-auto flex flex-col text-white font-outfit">
        <style>{getStyleSheet()}</style>

        <div className='w-full flex items-center justify-between'>
          <Header onClose={onClose} />
          <span className='px-4 text-[15px] text-white/60'>Category: {animation.category} Animation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 w-full min-h-0 rounded-xl overflow-hidden">
          <section
            className="relative flex items-center justify-center min-h-[510px] bg-zinc-100 transition-colors duration-300"
            style={{ backgroundColor: previewBg }}
          >
            <div className="absolute top-3 right-4 flex items-center z-20 ">
              <span className={`text-[16px] font-medium font-heading mr-3 ${previewBg === '#e8e8e8' ? 'text-black' : 'text-white'}`}>
                {previewBg}
              </span>
              <div className={`relative flex items-center gap-1 ${previewBg === '#e8e8e8' ? 'bg-zinc-300' : 'bg-zinc-800'} p-1 rounded-full w-14 h-7`}>
                <label
                  htmlFor="themeToggle"
                  className="absolute cursor-pointer top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-all duration-300"
                  style={{ transform: previewBg === '#e8e8e8' ? 'translateX(0px)' : 'translateX(28px)' }}
                />
                <input
                  id="themeToggle"
                  type="checkbox"
                  className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                  checked={previewBg !== '#e8e8e8'}
                  onChange={e => setPreviewBg(e.target.checked ? '#161616' : '#e8e8e8')}
                />
                <div className="flex w-full justify-between px-1 pointer-events-none">
                  <Sun size={12} className={previewBg === '#e8e8e8' ? 'text-black' : 'text-zinc-500'} />
                  <Moon size={12} className={previewBg !== '#e8e8e8' ? 'text-black' : 'text-zinc-500'} />
                </div>
              </div>
              <input
                type="color"
                value={previewBg}
                onChange={e => setPreviewBg(e.target.value)}
                className="h-7 w-7 ml-3 cursor-pointer rounded-lg border-none bg-transparent"
              />
            </div>

            <div className="modal-preview-target">
              <div className="scale-[2.0] lg:scale-[2.5]">
                {displayType === 'text' && <h1 className={`text-4xl font-black ${previewBg === '#e8e8e8' ? 'text-black' : 'text-white'} tracking-tighter italic`}>Aa</h1>}
                {displayType === 'box' && <div className={`w-12 h-12 ${previewBg === '#e8e8e8' ? 'bg-black' : 'bg-white'} rounded-xl shadow-2xl`} />}
                {displayType === 'circle' && <div className={`w-12 h-12 ${previewBg === '#e8e8e8' ? 'bg-black' : 'bg-white'} rounded-full shadow-xl`} />}
                {displayType === 'icon' && <Star size={40} className={`${previewBg === '#e8e8e8' ? 'text-black fill-black' : 'text-white fill-white'}`} />}
              </div>
            </div>
          </section>

          <section className="flex flex-col bg-[#000] border-l border-zinc-800/50 min-h-[400px] lg:min-h-0 relative">
            <div className="flex items-center justify-between bg-[#111] px-4 py-3 border-b border-zinc-800/50">
              <div className="flex items-center gap-1 text-blue-400">
                <FaCss3 size={16} />
                <span className="text-[18px] font-bold tracking-tight">CSS</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 py-1.5 px-3 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy CSS'}
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
                  fontSize: 15,
                  wordWrap: 'on',
                  padding: { top: 20 },
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </section>
        </div>
      </div>

      <footer className="w-full bg-[#111] border-t border-zinc-800 p-2 rounded-xl relative bottom-4">
        <button className="flex items-center gap-2 px-5 py-2.5 text-white hover:bg-black/40 rounded-lg">
          <BookmarkIcon size={18} />
          Save Favorite
        </button>
      </footer>

      <div className="w-full flex items-center justify-start md:justify-end mt-5">
        <div className="flex flex-col items-start gap-3">
          <h2 className="font-heading text-4xl text-white font-bold ">{animation.title}</h2>
          <p className="text-white/50 font-outfit text-[18px] max-w-[400px] leading-tight">
            {animation.desc}
          </p>
          <div className="flex items-center gap-2 text-white/60">
            <span>Animation duration:</span>
            <Clock size={16} />
            <span className="text-sm font-medium">{animation.duration}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function Header({ onClose }) {
  return (
    <div className="flex items-center px-4 h-14 shrink-0 relative right-3 ">
      <button
        onClick={onClose}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-zinc-900 transition-all cursor-pointer"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Go Back</span>
      </button>
    </div>
  );
}
