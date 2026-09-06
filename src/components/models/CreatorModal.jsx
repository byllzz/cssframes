import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { FaCss3, FaGithub, FaTwitter } from 'react-icons/fa6';

import {
  X,
  Star,
  Moon,
  Sun,
  Rocket,
  Clock,
  AlignLeft,
  Type,
  Info,
  User,
  AlertCircle
} from 'lucide-react';

const DRAFT_KEY = 'cssframes_creator_draft';

const getDefaultCss = (animationCategory) => `/* Note: Please always target the class .preview-element */
.preview-element {
  animation: ${animationCategory.toLowerCase()}-animation ;
}

@keyframes ${animationCategory.toLowerCase()}-animation {
  0% { }
  50% {  }
  100% {  }
}`;

export default function CreatorModal({
  category: config,
  onClose,
  onSave,
  handleStartCreating,
}) {
  const animationCategory = config?.category || 'General';
  const objectType = config?.type || 'box';

  const loadDraft = () => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.animationCategory === animationCategory) return parsed;
      }
    } catch (e) {
      console.error('Failed to load draft', e);
    }
    return null;
  };

  const draft = loadDraft();

  const [previewBg, setPreviewBg] = useState(draft?.previewBg ?? '#e8e8e8');
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [title, setTitle] = useState(draft?.title ?? '');
  const [desc, setDesc] = useState(draft?.desc ?? '');
  const [duration, setDuration] = useState(draft?.duration ?? '2s');
  const [errors, setErrors] = useState({});
  const [cssCode, setCssCode] = useState(draft?.cssCode ?? getDefaultCss(animationCategory));

  const [creatorName, setCreatorName] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');

  useEffect(() => {
    try {
      const draftData = {
        animationCategory,
        cssCode,
        title,
        desc,
        duration,
        previewBg,
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  }, [cssCode, title, desc, duration, previewBg, animationCategory]);

  useEffect(() => {
    Prism.highlightAll();
  }, [cssCode]);

  const handleTriggerPopup = () => setShowDetailsPopup(true);

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.error('Failed to clear draft', e);
    }
  };

  const formatSocialUrl = (input, platform) => {
    if (!input) return '';
    const cleanInput = input.trim().replace('@', '');
    if (cleanInput.startsWith('http')) return cleanInput;
    return platform === 'github'
      ? `https://github.com/${cleanInput}`
      : `https://twitter.com/${cleanInput}`;
  };

const handleFinalSubmit = () => {
  const newErrors = {};
  if (!title.trim()) newErrors.title = 'Title required';
  if (!desc.trim()) newErrors.desc = 'Description required';
  if (!creatorName.trim()) newErrors.creatorName = 'Name required';

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }

  const newEntry = {
    id: `community-${Date.now()}`,
    title: title.trim(),
    desc: desc.trim(),
    keyframes: cssCode,
    category: animationCategory,
    type: objectType,
    duration: duration || '2s',
    previewBg,
    isCommunity: true,
    creator: {
      name: creatorName.trim(),
      github: formatSocialUrl(github, 'github'),
      twitter: formatSocialUrl(twitter, 'twitter'),
    },
  };

  clearDraft();
  // keeps CreatorModal mounted until the async POST finishes
  onSave(newEntry);
};
  // A stable per-mount suffix instead of Date.now() called at render
  // time — the old version generated a brand-new "unique" name on every
  // single re-render, which restarted the CSS animation from scratch on
  // every keystroke or color change in the preview.
  const [instanceId] = useState(() => Math.random().toString(36).slice(2, 9));

  const getStyleSheet = () => {
    if (!cssCode) return '';
    const match = cssCode.match(/@keyframes\s+([\w-]+)/);
    const keyframeName = match ? match[1] : 'my-pulse';
    const safeName = `exec-${instanceId}`;
    const processed = cssCode.replace(new RegExp(keyframeName, 'g'), safeName);

    return `
      ${processed}
      .preview-element {
        animation: ${safeName} ${duration} ease-in-out infinite !important;
      }
    `;
  };

  return (
    <div className="w-full h-full flex flex-col text-white font-outfit overflow-hidden rounded-[12px] relative bottom-13 bg-[#050505]">
      <style>{getStyleSheet()}</style>

      <button
        onClick={onClose}
        aria-label="Close creator"
        className="absolute top-3 left-3 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-zinc-300 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>

      <div className="flex h-full flex-col md:grid md:grid-cols-2 flex-1 md:min-h-[500px] ">
        {/* PREVIEW */}
        <section
          className="relative flex items-center justify-center overflow-hidden h-[400px] md:h-full transition-colors duration-500 rounded-bl-[12px]"
          style={{ backgroundColor: previewBg }}
        >
          <div className="absolute top-3 right-3 flex items-center z-20">
            <span
              className={`text-[18px] mr-3 ${previewBg === '#e8e8e8' ? 'text-black' : 'text-white'}`}
            >
              {previewBg}
            </span>
            <div
              className={`relative flex items-center p-1 rounded-full w-[64px] h-8 ${previewBg === '#e8e8e8' ? 'bg-zinc-300' : 'bg-[#050505]'}`}
            >
              <label
                className="absolute cursor-pointer top-1 left-1 h-[24px] w-[24px] rounded-full bg-white transition-all duration-300"
                style={{
                  transform: previewBg === '#e8e8e8' ? 'translateX(0px)' : 'translateX(32px)',
                }}
              />
              <input
                type="checkbox"
                className="absolute opacity-0 w-full h-full cursor-pointer z-20"
                checked={previewBg !== '#e8e8e8'}
                onChange={e => setPreviewBg(e.target.checked ? '#161616' : '#e8e8e8')}
              />
              <div className="flex w-full justify-between px-1 relative z-10 pointer-events-none">
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
            <input
              type="color"
              value={previewBg}
              onChange={e => setPreviewBg(e.target.value)}
              className="h-[29px] w-7.5 ml-4 cursor-pointer rounded-[5px] border bg-transparent p-0 overflow-hidden"
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
                className={`preview-element text-4xl font-black ${previewBg === '#e8e8e8' ? 'text-black' : 'text-white'} italic tracking-tighter`}
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
        <section className="h-[300px] md:h-full flex flex-col bg-[#121212] border-l border-zinc-800/50">
          <div className="flex items-center bg-[#161616] px-4 py-2.5 border-b border-zinc-800/50  rounded-br-[12px]">
            <FaCss3 className="text-blue-500 mr-2" />
            <h3 className="text-[18px] font-bold uppercase tracking-tight">CSS</h3>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language="css"
              theme="vs-dark"
              value={cssCode}
              onChange={v => setCssCode(v || '')}
              options={{
                fontSize: 16,
                minimap: { enabled: false },
                wordWrap: 'on',
                padding: { top: 15 },
              }}
            />
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="h-17 bg-[#161616] flex items-center justify-between px-2 border-t rounded-[12px] border-zinc-800/50 mt-5">
        <button
          onClick={handleStartCreating}
          className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-[#050505] py-3.5 px-8 rounded-[8px] transition-colors text-sm"
        >
          <AlignLeft size={18} /> Change Category
        </button>
        <button
          onClick={handleTriggerPopup}
          className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3.5 rounded-[8px] font-bold flex items-center gap-2 transition-all"
        >
          <Rocket size={18} /> Submit to Community
        </button>
      </div>

      {/* NEW SIDE-PANEL DETAILS POPUP */}
      {showDetailsPopup && (
        <div className="fixed inset-0 z-[500] flex items-center justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowDetailsPopup(false)}
          />

          <div className="relative h-full w-full max-w-md bg-[#0F0F0F] border-l border-zinc-800 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-8 py-4 border-b border-zinc-800 bg-[#141414] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Rocket className="text-indigo-500" size={20} /> Publish Work
                </h3>
                <p className="text-zinc-500 text-xs mt-1">Fill all required fields to share.</p>
              </div>
              <button
                onClick={() => setShowDetailsPopup(false)}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-indigo-500 font-outfit uppercase tracking-wide relative bottom-2">
                  Animation Info
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <Type size={16} className="absolute left-3 top-3.5 text-zinc-600" />
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Title *"
                      className={`w-full bg-[#161616] border ${errors.title ? 'border-red-500' : 'border-zinc-800'} pl-10 p-3.5 rounded-xl text-sm focus:border-indigo-500 outline-none transition-all`}
                    />
                  </div>
                  <div className="relative">
                    <Info size={16} className="absolute left-3 top-3.5 text-zinc-600" />
                    <textarea
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                      placeholder="Description *"
                      rows={3}
                      className={`w-full bg-[#161616] border ${errors.desc ? 'border-red-500' : 'border-zinc-800'} pl-10 p-3.5 rounded-xl text-sm focus:border-indigo-500 outline-none transition-all resize-none`}
                    />
                  </div>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-3.5 text-zinc-600" />
                    <input
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      placeholder="Duration (e.g. 2s)"
                      className="w-full bg-[#161616] border border-zinc-800 pl-10 p-3.5 rounded-xl text-sm focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-indigo-500 font-outfit uppercase tracking-wide relative bottom-2">
                  Creator Profile
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3.5 text-zinc-600" />
                    <input
                      value={creatorName}
                      onChange={e => setCreatorName(e.target.value)}
                      placeholder="Your Name *"
                      className={`w-full bg-[#161616] border ${errors.creatorName ? 'border-red-500' : 'border-zinc-800'} pl-10 p-3.5 rounded-xl text-sm focus:border-indigo-500 outline-none`}
                    />
                  </div>
                  <div className="relative">
                    <FaGithub size={16} className="absolute left-3 top-3.5 text-zinc-600" />
                    <input
                      value={github}
                      onChange={e => setGithub(e.target.value)}
                      placeholder="Your's GitHub Username *"
                      className={`w-full bg-[#161616] border ${errors.github ? 'border-red-500' : 'border-zinc-800'} pl-10 p-3.5 rounded-xl text-sm focus:border-indigo-500 outline-none`}
                    />
                  </div>
                  <div className="relative">
                    <FaTwitter size={16} className="absolute left-3 top-3.5 text-zinc-600" />
                    <input
                      value={twitter}
                      onChange={e => setTwitter(e.target.value)}
                      placeholder="Your's Twitter Username *"
                      className={`w-full bg-[#161616] border ${errors.twitter ? 'border-red-500' : 'border-zinc-800'} pl-10 p-3.5 rounded-xl text-sm focus:border-indigo-500 outline-none`}
                    />
                  </div>
                </div>
                {Object.keys(errors).length > 0 && (
                  <div className="flex items-center gap-2 text-red-500 text-[11px] font-bold p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                    <AlertCircle size={14} /> Please fill all mandatory fields.
                  </div>
                )}
              </div>
            </div>

            <div className="px-8 py-5 border-t border-zinc-800 bg-[#141414]">
              <button
                onClick={handleFinalSubmit}
                className="w-full bg-white text-black py-6 rounded-[8px] font-black uppercase text-xs tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5"
              >
                Publish to Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
