import React from 'react';
import {  Sun, Zap, ShieldCheck, X, Box, Type, Circle, Star } from 'lucide-react';

export default function SettingsPanel({ onClose}) {
  return (
    <div className=" w-80 animate-in slide-in-from-left-4 fade-in duration-300" >
      <div className="bg-[#121212] border border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden font-outfit">

        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between">
          <h2 className="text-lg font-normal text-zinc-100">Settings</h2>
          <button
            onClick={() => onClose(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        {/*  Settings List */}
        <div className="px-3 pb-3 space-y-1">
          <MiniSetting
            icon={<Sun size={16} className="text-zinc-400" />}
            label="Theme"
            subLabel="Customize UI colors"
            action={<div className="text-[10px] bg-zinc-800 px-3 py-1 rounded-full text-zinc-400 border border-zinc-700">DARK</div>}
          />

          <MiniSetting
            icon={<Zap size={16} className="text-zinc-400" />}
            label="Performance"
            subLabel="Reduce motion effects"
            action={<SmallToggle defaultChecked />}
          />

          <MiniSetting
            icon={<ShieldCheck size={16} className="text-zinc-400" />}
            label="Snippets"
            subLabel="Auto-copy Tailwind"
            action={<SmallToggle defaultChecked />}
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900/30 border-t border-zinc-800/50 text-center">
           <p className="text-[10px] text-zinc-600 font-mono tracking-tighter">CSSFRAMES v1.0.4 — BETA</p>
        </div>
      </div>
    </div>
  );
}

// sub-components
function MiniSetting({ icon, label, subLabel, action }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-800/40 rounded-[1.5rem] transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-zinc-200 text-sm font-medium leading-none mb-1">{label}</span>
          <span className="text-[10px] text-zinc-500 font-mono leading-none">{subLabel}</span>
        </div>
      </div>
      {action}
    </div>
  );
}

function SmallToggle({ defaultChecked }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-10 h-5 bg-zinc-800 rounded-full peer peer-checked:bg-zinc-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-white"></div>
    </label>
  );
}
