import React from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function DevelopmentPopup({ onClose }) {
  return (
    <div className="fixed inset-0  z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
      {/* soft glow */}
      <div className="absolute w-72 h-72 bg-white/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full max-w-[600px] rounded-[8px] border border-white/10 bg-[#0a0a0a] overflow-hidden">
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        <div className="p-8 md:p-10">

          {/* heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight font-heading">
            CSSFrames is evolving.
          </h2>

          {/* message */}
          <p className="mt-4 text-sm md:text-base text-zinc-400 leading-7 max-w-md">
            The animation engine is production-ready, while profile tools,
            bookmarks, and a few supporting pages are still being refined.
          </p>

          {/* contribution section */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-zinc-300 leading-6">
              Want to help shape CSSFrames? Contributions, ideas, and issue reports
              are welcome on GitHub.
            </p>

            <a
              href="https://github.com/byllzz/cssframes"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors"
            >
              <FaGithub size={16} />
              Contribute on GitHub
            </a>
          </div>

          {/* actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-[5px] cursor-pointer bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:scale-[0.99]"
            >
              Continue Exploring
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* bottom subtle accent */}
        <div className="h-px w-full bg-white/10" />
      </div>
    </div>
  );
}
