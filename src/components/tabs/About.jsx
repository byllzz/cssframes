import React from 'react';
import { Sparkles, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { FaInfinity } from 'react-icons/fa6';

export default function About({ onBack , animations }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-outfit select-none selection:bg-indigo-500 selection:text-white">
      {/* STICKY TOP NAVIGATION */}
      <nav className="sticky top-0 z-50 w-full bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit to Library</span>
        </button>
      </nav>

      <div className="px-6 md:px-12 lg:px-24 py-24 max-w-7xl mx-auto">
        {/*HERO SECTION */}
        <header className="mb-32 md:mb-56">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-zinc-900/50 border border-white/5 text-zinc-400 text-[9px] font-black tracking-[0.2em] uppercase mb-10">
            <Sparkles size={12} className="text-indigo-500" />
            <span>Core Protocol v1.0</span>
          </div>

          <h1 className="text-[14vw] md:text-[120px] font-black leading-[0.8] tracking-[-0.05em] uppercase mb-12">
            Motion is <br />
            <span className="text-zinc-900 outline-text transition-all duration-700 hover:text-indigo-600 hover:tracking-normal cursor-default">
              not a luxury.
            </span>
          </h1>

          <p className="text-xl md:text-4xl text-zinc-400 max-w-4xl leading-[1.1] tracking-tight font-bold">
            Cssframes is an open-source movement to{' '}
            <span className="text-white">standardize high-performance</span> web motion. Built
            because the gap between design and production was too wide.
          </p>
        </header>

        {/*FEATURES */}
        <section className="mb-48 md:mb-72 space-y-0 border-t border-zinc-900">
          <FeatureRow
            number="01"
            title="GPU Optimized"
            desc="Every frame is tuned for the compositor thread. 60fps is our baseline, not our goal."
          />
          <FeatureRow
            number="02"
            title="Zero Runtime"
            desc="No JavaScript dependencies. No massive bundles. Just raw, purified CSS keyframes."
          />
          <FeatureRow
            number="03"
            title="Tailwind Ready"
            desc="Designed to fit into your existing workflow with arbitrary value support and native presets."
          />
        </section>

        {/* VISION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-56">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-indigo-500 uppercase mb-6">
              The Mission
            </h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Crafted by <br /> One, for <br />{' '}
              <span className="italic text-zinc-800">Everyone.</span>
            </h3>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <p className="text-2xl md:text-3xl text-zinc-200 leading-tight font-medium border-l-4 border-indigo-600 pl-8 py-2">
              "I was tired of copy-pasting mediocre transitions from different corners of the web. I
              wanted a central hub for 'Apple-style' smoothness that worked by just hitting Ctrl+C."
            </p>
            <div className="space-y-6 text-zinc-500 leading-relaxed text-lg font-medium">
              <p>
                Cssframes is a solo research project born out of an obsession with
                micro-interactions. Every easing curve and every pixel shift is manually tuned.
              </p>
              <p>
                This isn't a corporate library; it's a developer's workshop. No bloat, no fluff—just
                the fastest way to add high-end motion to your React applications.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-8">
              <LargeSocial
                link="https://github.com/byllzz/cssframes"
                label="Source Code"
                icon={<FaGithub size={18} />}
              />
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="border-y border-zinc-900 py-20 grid grid-cols-2 lg:grid-cols-4 gap-12">
          <Stat value={`${animations.length}+`} label="Presets" />
          <Stat value="0.0kb" label="JS Overhead" />
          <Stat value="2026" label="Inception" />
        </div>

        {/* GIANT BRANDING SIGNATURE */}
        <div className="mt-40 overflow-hidden py-20">
          <span className="text-[18vw] font-black text-zinc-900/20 tracking-[-0.08em] select-none block text-center leading-none">
            FRAMES
          </span>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px #27272a;
        }
        .outline-text:hover {
          -webkit-text-stroke: 1px transparent;
        }
      `}</style>
    </div>
  );
}

/* SUB-COMPONENTS */
function FeatureRow({ number, title, desc }) {
  return (
    <div className="group flex flex-col md:flex-row w-full md:items-center md:justify-center gap-6 md:gap-12 border-b border-zinc-900 py-16 transition-all">
      <span className="text-indigo-600 font-mono text-xs font-black tracking-widest">{number}</span>
      <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase transition-all duration-500 group-hover:text-indigo-500">
        {title}
      </h3>
      <p className="md:ml-auto max-w-sm text-zinc-500 text-sm md:text-base font-medium leading-snug">
        {desc}
      </p>
    </div>
  );
}

function LargeSocial({ label, icon, link }) {
  return (
    <a target='_blank' href={link} className="flex items-center gap-4 px-10 py-5 bg-white text-black transition-all hover:bg-indigo-600 hover:text-white group rounded-[2px]">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-none">{value}</span>
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">{label}</span>
    </div>
  );
}
