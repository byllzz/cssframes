import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white px-6">
      <div className="w-full max-w-[600px] border border-white/10 bg-[#0a0a0a] rounded-[8px] p-8 md:p-10">

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          CSSFrames is evolving.
        </h2>

        <p className="mt-4 text-sm md:text-base text-zinc-400 leading-7">
          The animation engine is production-ready, while profile tools,
          bookmarks, and a few supporting pages are still being refined.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-zinc-300">
            Want to help shape CSSFrames? Contributions and ideas are welcome.
          </p>

          <a
            href="https://github.com/byllzz/cssframes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
          >
            <FaGithub size={16} />
            Contribute on GitHub
          </a>
        </div>

        <button
          onClick={() => navigate('/animations')}
          className="mt-8 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-[5px]"
        >
          Enter App
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
