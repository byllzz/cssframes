import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  // Twitter,
  Link as LinkIcon,
  QrCode,
  Command,
  FileCode,
  Share2
} from 'lucide-react';

export default function SharePanel({ animation, isOpen, onClose }) {
  const [copiedType, setCopiedType] = useState(null);

  //  If it's closed or animation is missing, don't run logic
  if (!isOpen || !animation) return null;

  //  animation is guaranteed to be the single object you clicked
  const shareUrl = `https://cssframes.vercel.app/${animation.id}`;

  const copyToClipboard = async (text, type) => {
    if (!text) return;

    try {
      // Attempt modern API
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
    } catch (err) {
      // Fallback for older browsers or security restrictions
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedType(type);
      } catch (fallbackErr) {
        console.error('Failed to copy: ', fallbackErr);
      }
    }

    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Panel Container */}
      <div className="relative w-full max-w-lg bg-[#050505] border border-white/10 rounded-[8px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] font-outfit">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[5px] bg-white text-black flex items-center justify-center">
              <Share2 size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Export Asset</h2>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                Unit: {animation.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5  cursor-pointer rounded-[5px] text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Link Section */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">
              Share Link
            </label>
            <div className="flex gap-2">
              <div className="flex-1 bg-zinc-900 border border-white/5 rounded-[5px] px-4 py-2 text-zinc-400 text-sm truncate font-mono flex items-center">
                {shareUrl}
              </div>
              <button
                onClick={() => copyToClipboard(shareUrl, 'link')}
                className="px-4 bg-white text-black font-bold text-xs rounded-[5px] flex items-center gap-2 hover:bg-zinc-200 transition-colors  cursor-pointer"
              >
                {copiedType === 'link' ? <Check size={14} /> : <Copy size={14} />}
                {copiedType === 'link' ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Social Share */}
            <button className="flex items-center cursor-pointer justify-center gap-3 p-4 bg-zinc-900 border border-white/5 rounded-[5px] hover:border-white/20 transition-all group">
              <TwitterSvg height={24} className="text-zinc-400 group-hover:text-[#1DA1F2]" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                Twitter
              </span>
            </button>

            {/* Generate QR */}
            <button className="flex items-center  cursor-pointer justify-center gap-3 p-4 bg-zinc-900 border border-white/5 rounded-[5px] hover:border-white/20 transition-all group">
              <QrCode size={18} className="text-zinc-400 group-hover:text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                QR CODE
              </span>
            </button>
          </div>

          {/* Technical Section */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-[8px] p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-zinc-500">
              <FileCode size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Developer Handover
              </span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Animation ID', value: animation.id },
                { label: 'Raw Keyframes', value: animation.keyframes },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 font-medium">{item.label}</span>
                  <button
                    onClick={() => copyToClipboard(item.value, item.label)}
                    className="text-zinc-400  cursor-pointer hover:text-white font-mono flex items-center gap-2 bg-black/40 px-2 py-1 rounded-[3px]"
                  >
                    {copiedType === item.label ? 'SUCCESS' : 'COPY'}
                    <Command size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-zinc-900/20 border-t border-white/5 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
            Asset verified for production use
          </span>
        </div>
      </div>
    </div>
  );
}


function TwitterSvg({height = 20}) {
  return (
    <span>
      <svg fill="#fff" height={height} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M11.919 24.94c-2.548 0-4.921-.747-6.919-2.032a9.049 9.049 0 0 0 6.681-1.867 4.512 4.512 0 0 1-4.215-3.137c.276.054.559.082.848.082.412 0 .812-.056 1.193-.156a4.519 4.519 0 0 1-3.622-4.425v-.059a4.478 4.478 0 0 0 2.042.564 4.507 4.507 0 0 1-2.008-3.758c0-.824.225-1.602.612-2.268a12.811 12.811 0 0 0 9.303 4.715 4.517 4.517 0 0 1 7.692-4.115 9.107 9.107 0 0 0 2.866-1.094 4.542 4.542 0 0 1-1.983 2.498 9.08 9.08 0 0 0 2.592-.71 9.283 9.283 0 0 1-2.252 2.337c.008.193.014.388.014.583-.001 5.962-4.542 12.843-12.844 12.842"></path>
        </g>
      </svg>
    </span>
  );
}
