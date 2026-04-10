import React from 'react';
import { Sparkles, ArrowUpRight, User } from 'lucide-react';

export default function About({  }) {
  return (
    <div className="min-h-screen text-white font-outfit select-none">

      {/* Mini Navigation Header */}
      <div className="flex items-center gap-3 border-zinc-900 px-8 py-6">
        <div className="p-1.5 bg-zinc-900 rounded-[5px] border border-zinc-800">
          <User size={14} className="text-zinc-400" />
        </div>
        <span className="text-[10px] font-black uppercase font-heading text-zinc-500">
          Story of CSSFRAMES
        </span>
      </div>

      <div className="px-6 md:px-12 lg:px-24 py-20 max-w-7xl mx-auto">
        {/* HERO: The Big Statement */}
        <header className="mb-40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold tracking-widest uppercase mb-12">
            <Sparkles size={12} className="text-indigo-400" />
            <span>Independent Research & Development</span>
          </div>

          <h1 className="text-6xl md:text-[120px] font-black leading-[0.85] tracking-tighter uppercase mb-12">
            Motion is <br />
            <span className="text-zinc-800 transition-colors duration-700 hover:text-indigo-500">
              not a luxury.
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-zinc-500 max-w-4xl leading-tight tracking-tight font-medium">
            Cssframes is an open-source movement to standardize high-performance web motion. Built
            because the gap between "design tool" animations and "production" code was too wide.
          </p>
        </header>

        {/* TYPOGRAPHIC FEATURES: No Boxes, just Bold Text */}
        <section className="mb-60 space-y-32">
          <FeatureRow
            number="01"
            title="GPU ACCELERATED"
            desc="Every frame is optimized for the compositor thread. 60fps is the baseline, not the goal."
          />
          <FeatureRow
            number="02"
            title="ZERO WEIGHT"
            desc="No JavaScript runtimes. No massive bundles. Just raw, purified CSS keyframes."
          />
          <FeatureRow
            number="03"
            title="TAILWIND NATIVE"
            desc="Designed to fit into your existing workflow with arbitrary value support and config presets."
          />
        </section>

        {/* THE SOLO VISION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-60">
          <div className="sticky top-32">
            <h2 className="text-xs font-black tracking-[0.5em] text-zinc-700 uppercase mb-4">
              The Vision
            </h2>
            <h3 className="text-5xl font-black tracking-tighter uppercase leading-none">
              Crafted by <br /> One, for <br /> <span className="text-indigo-600">Everyone.</span>
            </h3>
          </div>

          <div className="space-y-8">
            <p className="text-xl text-zinc-400 leading-relaxed italic border-l-2 border-indigo-600 pl-8">
              "I was tired of copy-pasting mediocre transitions from different corners of the web. I
              wanted a central hub for 'Apple-style' smoothness that worked by just hitting Ctrl+C."
            </p>
            <p className="text-zinc-500 leading-relaxed text-lg">
              Cssframes is a solo project born out of a obsession with details. Every easing curve,
              every pixel shift, and every line of code is manually tuned to ensure it feels right.
              This isn't a corporate tool; it's a developer's toolkit.
            </p>

            <div className="flex gap-4 pt-10">
              <LargeSocial link="#" label="Github" />
              {/* <LargeSocial link="#"  label="Updates" /> */}
            </div>
          </div>
        </div>

        {/* GIANT STATS FOOTER */}
        <div className="border-t border-zinc-900 pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <Stat value="10+" label="Animations" />
          <Stat value="0.0kb" label="JS Overhead" />
          <Stat value="∞" label="Open Source" />
          <Stat value="2026" label="Inception" />
        </div>

        {/* Final Branding Signature */}
        <div className="mt-40 text-center">
          <span className="text-[150px] font-black text-zinc-900/30 tracking-tighter select-none">
            FRAMES
          </span>
        </div>
      </div>
    </div>
  );
}

{/* sub comps */}

function FeatureRow({ number, title, desc }) {
  return (
    <div className="group flex flex-col md:flex-row md:items-center gap-8 border-b border-zinc-900 pb-12">
      <span className="text-indigo-600 font-mono text-sm font-bold tracking-widest">{number}</span>
      <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase transition-all duration-500 group-hover:pl-4">
        {title}
      </h3>
      <p className="md:ml-auto max-w-xs text-zinc-600 text-sm font-medium leading-tight">
        {desc}
      </p>
    </div>
  );
}

function LargeSocial({ label, icon, link }) {
  return (
    <a href={link} className="flex items-center gap-3 px-8 py-4 rounded-[5px] bg-white text-black transition-all group">
      {icon}
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
      <ArrowUpRight size={14} className=" transition-all" />
    </a>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col">
      <span className="text-5xl font-black tracking-tighter mb-2">{value}</span>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">{label}</span>
    </div>
  );
}
