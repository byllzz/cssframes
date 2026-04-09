import React from 'react';
import {  Code2, Sparkles, Zap, Layout } from 'lucide-react';
// import GithubSvg from './GithubSvg'

export default function About() {
  return (
    <div className="max-w-full mx-auto px-6 py-20 font-outfit overflow-y-auto h-full">
      {/* --- Hero Section --- */}
      <header className="mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-6 animate-bounce">
          <Sparkles size={14} className="text-yellow-500" />
          <span>EST. 2024</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8">
          Crafting <span className="text-zinc-500">Motion</span> <br />
          for the Modern Web.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
          Cssframes is an open-source library built for designers and developers who
          believe that animations shouldn't just be an afterthought—they should be an experience.
        </p>
      </header>

      {/* --- Feature Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        <AboutCard
          icon={<Zap className="text-indigo-400" />}
          title="Performance First"
          description="GPU-accelerated keyframes ensuring 60fps across all modern browsers and mobile devices."
        />
        <AboutCard
          icon={<Layout className="text-emerald-400" />}
          title="Tailwind Ready"
          description="One-click copy for Tailwind CSS arbitrary values. No complex configuration required."
        />
        <AboutCard
          icon={<Code2 className="text-orange-400" />}
          title="Pure CSS"
          description="Zero dependencies. No massive JS bundles. Just clean, optimized CSS for your projects."
        />
      </div>

      {/* --- The Creator / Brand Section --- */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-[3rem] blur opacity-20" />
        <div className="relative bg-[#090909] border border-zinc-800 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12">

          <div className="w-48 h-48 bg-zinc-800 rounded-[2.5rem] flex-shrink-0 overflow-hidden border border-zinc-700">
             {/* Replace with actual image or logo */}
             <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-black flex items-center justify-center text-4xl font-bold text-white">
               CF
             </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              We started Cssframes because we were tired of copy-pasting the same mediocre
              animations. We wanted a central hub for high-quality, "Apple-style" motion
              that works anywhere. Built by developers, for developers.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <SocialLink  label="GitHub" />
              <SocialLink  label="Twitter" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Stats --- */}
      <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-900 pt-16">
        <Stat number="100+" label="Animations" />
        <Stat number="0" label="Dependencies" />
        <Stat number="60FPS" label="Performance" />
        <Stat number="FREE" label="Open Source" />
      </div>
    </div>
  );
}

// --- Helper Components ---

function AboutCard({ icon, title, description }) {
  return (
    <div className="p-8 bg-[#0c0c0c] border border-zinc-900 rounded-[2.5rem] hover:border-zinc-700 transition-all duration-500 group">
      <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function SocialLink({ icon, label }) {
  return (
    <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 text-sm hover:bg-white hover:text-black hover:border-white transition-all">
      {icon}
      <span>{label}</span>
    </a>
  );
}

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white mb-1 tracking-tighter">{number}</div>
      <div className="text-xs text-zinc-600 uppercase tracking-widest font-mono">{label}</div>
    </div>
  );
}
