import React, { useState } from 'react';
import { X, Copy, Check, Code2, MonitorPlay } from 'lucide-react';

export default function PreviewModal({ animation, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('css'); // 'css' or 'tailwind'

  if (!animation) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  //  scope the animation to the modal specifically
  const styleSheet = `
    @keyframes preview-${animation.id} {
      ${animation.keyframes}
    }
    .preview-element {
      animation: preview-${animation.id} ${animation.duration || '1s'} infinite;
    }
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <style>{styleSheet}</style>

      <div className="bg-[#161616] border border-zinc-800 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[500px]">

        {/* Left Side */}
        <div className="flex-1 bg-[#0f0f0f] flex flex-col items-center justify-center relative p-8 border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-zinc-500">
            <MonitorPlay size={16} />
            <span className="text-xs font-medium uppercase tracking-wider">Live Preview</span>
          </div>

          {/* The Animated Object */}
          <div className="preview-element text-5xl font-bold text-indigo-500 bg-indigo-500/10 p-8 rounded-2xl border border-indigo-500/20">
            Aa
          </div>

          <button
            onClick={onClose}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden bg-zinc-800 text-white px-6 py-2 rounded-full text-sm"
          >
            Close Preview
          </button>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[350px] flex flex-col bg-[#161616]">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white leading-none">{animation.title}</h2>
              <span className="inline-block mt-2 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded uppercase tracking-tighter">
                {animation.category}
              </span>
            </div>
            <button onClick={onClose} className="hidden md:block p-1 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('css')}
                  className={`text-xs font-bold uppercase tracking-widest ${activeTab === 'css' ? 'text-indigo-400 border-b border-indigo-400' : 'text-zinc-500'}`}
                >
                  CSS
                </button>
                <button
                  onClick={() => setActiveTab('tailwind')}
                  className={`text-xs font-bold uppercase tracking-widest ${activeTab === 'tailwind' ? 'text-indigo-400 border-b border-indigo-400' : 'text-zinc-500'}`}
                >
                  Tailwind
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative flex-1 group">
              <pre className="h-full bg-[#0f0f0f] p-4 rounded-xl border border-zinc-800 text-zinc-400 text-[13px] font-mono overflow-auto whitespace-pre-wrap">
                {activeTab === 'css' ? animation.css : animation.tailwind}
              </pre>

              <button
                onClick={() => handleCopy(activeTab === 'css' ? animation.css : animation.tailwind)}
                className="absolute top-2 right-2 p-2 bg-zinc-800/80 hover:bg-indigo-600 rounded-lg text-white transition-all scale-90 group-hover:scale-100"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <p className="mt-4 text-[11px] text-zinc-600 italic">
              {activeTab === "css" ? "*Paste the keyframes into your global styles." : "*Paste the tailwind utilities into directly html class."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
