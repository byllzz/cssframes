import React from 'react';
import {
  LayoutGrid,
  MousePointer2,
  Loader2,
  MoveRight,
  Layers,
  Settings2
} from 'lucide-react';
import GithubSvg from './GithubSvg';

const categories = [
  { name: 'All', icon: <LayoutGrid size={20} />, count: 42 },
  { name: 'Buttons', icon: <MousePointer2 size={20} />, count: 12 },
  { name: 'Loaders', icon: <Loader2 size={20} />, count: 8 },
  { name: 'Entrances', icon: <Layers size={20} />, count: 15 },
  { name: 'Transitions', icon: <MoveRight size={20} />, count: 7 },
];

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="w-[260px] h-screen bg-[#0f0f0f] border-r border-zinc-800 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">
          Cf
        </div>
        <h1 className="font-bold text-xl tracking-tight text-white">Cssframes</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        <p className="text-xs font-semibold text-zinc-500 uppercase px-3 mb-4">Categories</p>

        {categories.map(item => (
          <button
            key={item.name}
            onClick={() => setSelectedCategory(item.name)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
              selectedCategory === item.name
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={
                  selectedCategory === item.name ? 'text-indigo-400' : 'group-hover:text-indigo-400'
                }
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 mt-auto border-t border-zinc-800">
        <a
          href="https://github.com"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <GithubSvg />
          <span>Star on GitHub</span>
        </a>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors mt-1">
          <Settings2 size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
