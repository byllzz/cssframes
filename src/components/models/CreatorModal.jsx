import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { FaCss3 } from 'react-icons/fa6';

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

export default function CreatorModal({
  category: config,
  onClose,
  onSave,
  handleStartCreating,
}) {
  const animationCategory = config?.category || 'General';
  const objectType = config?.type || 'box';

  const [activeTab, setActiveTab] = useState('css');
  const [previewBg, setPreviewBg] = useState('#e8e8e8');

  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('2s');
  const [errors, setErrors] = useState({});

  const [cssCode, setCssCode] = useState(`/* Note: Please always target the class .preview-element */
.preview-element {
  animation: name ;
}

@keyframes name {
  0% { }
  50% {  }
  100% {  }
}`);

  const formatTimer = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [cssCode, activeTab]);

  const handleTriggerPopup = () => setShowDetailsPopup(true);

  const handleFinalSubmit = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Give your animation a name';
    if (!desc.trim()) newErrors.desc = 'Tell us what this does';
    if (!duration.trim()) newErrors.duration = 'Set a duration';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const newEntry = {
      id: `community-${Date.now()}`,
      title,
      desc,
      keyframes: cssCode,
      category: animationCategory,
      type: objectType,
      duration,
      isCommunity: true,
    };

    onSave(newEntry);
    onClose();
  };

  const getStyleSheet = () => {
    if (!cssCode) return '';

    const match = cssCode.match(/@keyframes\s+([\w-]+)/);
    const keyframeName = match ? match[1] : 'my-pulse';
    const safeName = `exec-${Date.now()}`;

    const processed = cssCode.replace(
      new RegExp(keyframeName, 'g'),
      safeName
    );

    return `
      ${processed}
      .preview-element {
        animation: ${safeName} ${duration} ease-in-out infinite !important;
      }
    `;
  };

  return (
    <div className="w-full h-full flex flex-col text-white font-outfit overflow-hidden rounded-[12px] relative md:bottom-10  bg-[#050505]">
      <style>{activeTab === 'css' ? getStyleSheet() : ''}</style>

      {/* GRID */}
      <div className="flex h-full flex-col md:grid  md:grid-cols-2 flex-1 md:min-h-[500px]">
        {/* PREVIEW */}
        <section
          className="relative flex items-center rounded-tl-[12px] rounded-bl-[12px] justify-center overflow-hidden h-[400px] md:h-full"
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

          <div className="modal-preview-target scale-150">
            {objectType === 'box' && (
              <div
                className={`preview-element w-16 h-16 ${previewBg === '#e8e8e8' ? 'bg-black' : 'bg-white'} rounded-[5px] shadow-2xl`}
              />
            )}

            {objectType === 'circle' && (
              <div
                className={`preview-element w-16 h-16 ${previewBg === '#e8e8e8' ? 'bg-black' : 'bg-white'} rounded-full shadow-xl`}
              />
            )}

            {objectType === 'text' && (
              <div
                className={`preview-element text-4xl font-black ${previewBg === '#e8e8e8' ? 'text-black' : 'text-white'} tracking-tighter italic`}
              >
                Aa
              </div>
            )}

            {objectType === 'icon' && (
              <Star
                size={48}
                className={`preview-element ${previewBg === '#e8e8e8' ? 'text-black fill-black' : 'text-white fill-white'}`}
              />
            )}
          </div>
        </section>

        {/* EDITOR */}
        <section className="h-[300px] md:h-full flex rounded-tr-[12px] rounded-br-[12px] flex-col bg-[#121212] border-l border-zinc-800/50">
          <div className="flex items-center justify-between bg-[#161616] px-4 py-1.5 border-b border-zinc-800/50 rounded-tr-[12px] rounded-br-[12px]">
            <div className="flex items-center justify-start gap-4 px-8 py-1 rounded-[5px] bg-[#000]">
              <span className="text-blue-500 relative right-4">
                <FaCss3 size={18} />
              </span>
              <h3 className="uppercase tracking-wide relative right-6"> CSS</h3>
            </div>
          </div>

          <div className="flex-1 rounded-tr-[12px] rounded-br-[12px]">
            <Editor
              height="100%"
              language="css"
              theme="vs-dark"
              value={cssCode}
              onChange={value => setCssCode(value || '')}
              options={{
                fontSize: 16,
                minimap: { enabled: false },
                wordWrap: 'on',
                padding: {
                  top: 15,
                },
              }}
            />
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="h-16 mt-3 bg-[#161616] rounded-[8px] flex items-center justify-between px-4">
        <button
          onClick={handleStartCreating}
          className="flex items-center cursor-pointer gap-2 px-4 py-3  hover:bg-[#121212] rounded"
        >
          <AlignLeft size={18} />
          Change Category
        </button>

        <button
          onClick={handleTriggerPopup}
          className="flex items-center cursor-pointer gap-2 bg-indigo-600 px-5 py-2.5 rounded-[5px] font-bold"
        >
          <Rocket size={18} />
          Submit to Community
        </button>
      </div>

      {/* POPUP */}
      {showDetailsPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowDetailsPopup(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-[#121212] border border-zinc-800 w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Tag className="text-indigo-500" size={20} />
                Finalize Animation
              </h3>
              <button
                onClick={() => setShowDetailsPopup(false)}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">
                  Animation Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Hyper Glow Pulse"
                  className={`w-full bg-[#090909] border ${errors.title ? 'border-red-500' : 'border-zinc-800'} rounded-lg py-3 px-4 text-white text-sm outline-none focus:border-indigo-500 transition-all`}
                />
                {errors.title && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase tracking-tight">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">
                  Description
                </label>
                <textarea
                  value={desc}
                  placeholder="This animation do this.."
                  onChange={e => setDesc(e.target.value)}
                  className={`w-full bg-[#090909] border ${errors.desc ? 'border-red-500' : 'border-zinc-800'} rounded-lg py-3 px-4 text-white text-sm h-24 resize-none outline-none focus:border-indigo-500 transition-all`}
                />
                {errors.desc && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase tracking-tight">
                    {errors.desc}
                  </p>
                )}
              </div>

              {/* Duration Input */}
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
                    className={`w-full bg-[#090909] border ${errors.duration ? 'border-red-500' : 'border-zinc-800'} rounded-lg py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-indigo-500 transition-all`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleFinalSubmit}
                className="w-full bg-white text-black font-black uppercase py-4 rounded-[5px] cursor-pointer mt-4 hover:bg-indigo-500 hover:text-white transition-all active:scale-[0.98]"
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

