import React  from 'react';
import { X } from 'lucide-react';

export default function AppearancePanel({ onClose }) {
  return (
    // SettingsPanel
    <div className=" w-80 animate-in slide-in-from-left-4 fade-in duration-300">

      {/* Container*/}
      <div className="bg-[#121212] border border-zinc-800 rounded-[16px] shadow-2xl overflow-hidden font-outfit">

        {/* Header  */}
        <div className="px-6 py-5 flex items-center justify-between">
          <h2 className="text-lg font-normal text-zinc-100">Appearance</h2>
          <button
            onClick={() => onClose(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 pb-3">
          {/* Theme Section */}
          <div className="mb-6">
            <div className="mb-3">
              <h3 className="text-sm text-zinc-100 font-medium">Theme</h3>
              <p className="text-[10px] text-zinc-500 font-mono">Customize UI colors</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <ThemeCard isActive={true} color="bg-zinc-900" />
              <ThemeCard color="bg-zinc-200" />
              <ThemeCard color="bg-[#d4a373]/80" />
            </div>
          </div>

          {/* Sidebar Toggle Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm text-zinc-100 font-medium">Sidebar</h3>
              <p className="text-[10px] text-zinc-500 font-mono">Transparent mode</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer scale-90">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-5 bg-zinc-800 rounded-full peer peer-checked:bg-zinc-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-white"></div>
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onClose(null)}
              className="py-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              className="py-3 rounded-2xl bg-zinc-800 text-zinc-100 text-sm font-medium hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function ThemeCard({ color, isActive = false }) {
  return (
    <div className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group border-2 transition-all ${isActive ? 'border-zinc-100' : 'border-transparent hover:border-zinc-700'}`}>
      <div className={`w-full h-full ${color} opacity-90 p-1.5`}>
        <div className="w-1/2 h-0.5 bg-white/10 rounded mb-1" />
        <div className="w-full h-4 bg-white/5 rounded-md mb-1" />
        <div className="flex gap-0.5">
          <div className="w-2 h-2 bg-white/5 rounded-sm" />
          <div className="w-2 h-2 bg-white/5 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
