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
  Monitor,
  Wand2,
} from 'lucide-react';

export default function PreviewModal({ animation, onClose, previewType }) {
  const [copied, setCopied] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [previewBg, setPreviewBg] = useState('#e8e8e8');


  const formatTimer = useRef(null);

  const uniqueId = animation?.id?.replace(/[^a-zA-Z0-9]/g, '') || 'default';
  const modalAnimName = `exec-${uniqueId}`;

  // initial load + format once
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

  // can be used this in future - if we add a custom btn to format the code..
  // const handleFormat = async () => {
  //   try {
  //     const formatted = await prettier.format(editedCode, {
  //       parser: 'css',
  //       plugins: [parserPostcss],
  //     });
  //     setEditedCode(formatted);
  //   } catch (error) {
  //     console.error('Prettier format failed:', error);
  //   }
  // };

  //   (debounced)
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
      } catch {
        // if prettier breaks, we keep raw
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
      processedCSS = editedCode.replace(
        new RegExp(actualNameInCode, 'g'),
        modalAnimName
      );
    }

    return `
      ${processedCSS}
      .modal-preview-target {
        animation: ${modalAnimName} ${animation.duration || '2s'} ease-in-out infinite !important;
      }
    `;
  };

  const displayType = animation.isCommunity
    ? animation.type
    : previewType;

  return (
    <div className="w-full h-full flex flex-col text-white font-outfit overflow-hidden rounded-[12px] relative bottom-10">
      <style>{getStyleSheet()}</style>

      <Header onClose={onClose} />

      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-[510px] w-full">
        {/* PREVIEW SIDE */}
        <section
          className="relative flex items-center justify-center overflow-hidden rounded-tl-[12px] rounded-bl-[12px] min-h-[500px] md:min-h-0"
          style={{ backgroundColor: previewBg }}
        >
          <div className="absolute top-3 right-3 flex items-center  z-20">
            <div className={`px-3 mr-1.5`}>
              <span
                className={`text-[18px] font-outfit font-normal ${previewBg === '#e8e8e8' ? 'text-black' : 'text-white'} lowercase`}
              >
                {previewBg}
              </span>
            </div>

            <div
              className={`relative flex items-center gap-1 ${
                previewBg === '#e8e8e8' ? 'bg-zinc-300' : 'bg-[#050505]'
              } p-1 rounded-full w-[64px] h-8`}
            >
              {/* sliding indicator */}
              <label
                htmlFor="themeToggle"
                className="absolute cursor-pointer top-1 left-1 h-[24px] w-[24px] rounded-full bg-white transition-all duration-300"
                style={{
                  transform: previewBg === '#e8e8e8' ? 'translateX(0px)' : 'translateX(32px)',
                }}
              />

              {/* hidden input toggle (actual state driver) */}
              <input
                id="themeToggle"
                type="checkbox"
                className="absolute opacity-0 w-[64px] z-12 h-full cursor-pointer "
                checked={previewBg !== '#e8e8e8'}
                onChange={e => setPreviewBg(e.target.checked ? '#161616' : '#e8e8e8')}
              />

              {/* icons */}
              <div className="relative z-10 flex w-full justify-between px-1">
                <Sun
                  size={14}
                  className={previewBg === '#e8e8e8' ? 'text-black' : 'text-zinc-400'}
                />
                <Moon
                  size={14}
                  className={previewBg !== '#e8e8e8' ? 'text-black' : 'text-zinc-400'}
                />
              </div>
            </div>
            {/* for whole bg changer input (type :color) */}
            <input
              type='color'
              value={previewBg}
              onChange={e => setPreviewBg(e.target.value)}
              className="h-[29px] w-7.5 ml-4 cursor-pointer rounded-[5px] border bg-transparent p-0 overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-2 [&::-webkit-color-swatch]:rounded-[5px] [&::-moz-color-swatch]:border-2 [&::-moz-color-swatch]:rounded-[5px]"
            />
          </div>

          <div className="modal-preview-target">
            <div className="flex items-center justify-center scale-150">
              {displayType === 'text' && (
                <h1
                  className={`text-4xl font-black ${previewBg === '#e8e8e8' ? 'text-black' : 'text-white'} tracking-tighter italic`}
                >
                  Aa
                </h1>
              )}
              {displayType === 'box' && (
                <div
                  className={`w-16 h-16 ${previewBg === '#e8e8e8' ? 'bg-black' : 'bg-white'} rounded-[5px] shadow-2xl`}
                />
              )}
              {displayType === 'circle' && (
                <div
                  className={`w-16 h-16 ${previewBg === '#e8e8e8' ? 'bg-black' : 'bg-white'} rounded-full shadow-xl`}
                />
              )}
              {displayType === 'icon' && (
                <Star
                  size={48}
                  className={`${previewBg === '#e8e8e8' ? 'text-black fill-black' : 'text-white fill-white'}`}
                />
              )}
            </div>
          </div>
        </section>

        {/* EDITOR */}
        <section className="w-full h-full min-h-[500px] md:min-h-0 rounded-tr-[12px] rounded-br-[12px] bg-[#000] flex flex-col border-l border-zinc-800/50 relative overflow-hidden">
          <div className="flex items-center justify-between bg-[#161616] px-4 py-1.5 border-b border-zinc-800/50">
            <div className="flex items-center justify-start gap-4 px-8 py-[6px] rounded-[5px] bg-[#121212]">
              <span className="text-blue-500 relative right-4">
                <FaCss3 size={18} />
              </span>
              <h3 className="uppercase tracking-wide relative right-6"> CSS</h3>
            </div>
          </div>

          <div className="absolute top-12 right-3 z-30">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 py-2 px-4 rounded-[5px] text-[13px] font-bold text-white bg-[#161616] cursor-pointer"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language="css"
              theme="vs-dark"
              value={editedCode}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: true },
                fontSize: 16,
                wordWrap: 'on',
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: false,
                padding: {
                  top: 15,
                },
              }}
            />
          </div>
        </section>
      </div>

      <div className="px-4 bg-[#161616] py-[6px] border-t mt-3 border-zinc-900 flex items-center justify-between rounded-[12px]">
        <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#121212] rounded-[8px] cursor-pointer">
          <BookmarkIcon size={20} /> Save to favorites
        </button>
        {/* <div className="text-[10px] text-zinc-600 font-bold uppercase">ID: {uniqueId}</div> */}
      </div>
    </div>
  );
}

function Header({ onClose }) {
  return (
    <div className="flex items-center justify-between h-13 shrink-0">
      <button
        onClick={onClose}
        className="flex items-center cursor-pointer gap-2 px-4 py-2.5 rounded-[8px] hover:bg-[#161616]"
      >
        <ArrowLeft size={18} />
        Go back
      </button>
    </div>
  );
}
