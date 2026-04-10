import React, { useState } from 'react';
import AppearancePanel from '../settings/AppearancePanel';
import {
  LayoutGrid,
  Layers,
  Settings2,
  CirclePlay,
  Loader,
  SlidersVertical,
  Home,
  User,
  Users,
} from 'lucide-react';

const navigations = [
  { name: 'Home', icon: <Home size={20} /> },
  { name: 'Community', icon: <Users size={20} /> },
  { name: 'About', icon: <User size={20} /> },
];

const categories = [
  { name: 'All', icon: <LayoutGrid size={20} /> },
  { name: 'Buttons', icon: <CirclePlay size={20} /> },
  { name: 'Loaders', icon: <Loader size={20} className="animate-spin" /> },
  { name: 'Entrances', icon: <Layers size={20} /> },
  { name: 'Transitions', icon: <SlidersVertical size={20} /> },
];



export default function Sidebar({
  selectedCategory,
  activeNavigation,
  onNavigate,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState(false);

  // Helper to determine if a main nav item should be highlighted
  // It only highlights if the nav matches AND no specific sub-category is selected
  const isNavActive = (name) => activeNavigation === name && (!selectedCategory || selectedCategory === 'All');

  return (
    <div
      className={`h-screen bg-[#050505] flex flex-col font-outfit border-r border-zinc-900 transition-all duration-300 ${
        isCollapsed ? 'w-[80px]' : 'w-[260px]'
      }`}
    >
      {/* Logo Section */}
      <div className={`py-6 px-4 flex items-center justify-between gap-3 mb-3 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && (
          <div className="flex items-center animate-in fade-in duration-500">
            <div className="rotate-45 mr-2">
              <svg height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.58571 7.75725C5.17149 9.17146 5.17149 9.17146 6.99988 10.9998H1.82855C0.828552 11.9998 0.828552 11.9998 1.82855 12.9998L7.00012 12.9998L5.17165 14.8283C6.58586 16.2425 6.58586 16.2425 9.41429 13.4141C10.1953 12.6331 10.1952 11.3667 9.41413 10.5857L6.58571 7.75725Z" fill="#fff"/>
                <path d="M17.4142 16.2428C18.8284 14.8286 18.8284 14.8286 17 13.0001H22.1716C23.1716 12.5524 23.1716 12.5524 22.1716 11.0001H17.0001L18.8285 9.17171C17.4143 7.75749 17.4143 7.75749 14.5858 10.5859C13.8048 11.367 13.8048 12.6333 14.5858 13.4144L17.4142 16.2428Z" fill="#fff"/>
              </svg>
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white">Cssframes</h1>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition-colors"
        >
          <svg height={18} fill="#ccc" viewBox="0 0 24 24">
            <path d="M20,24H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h16c2.2,0,4,1.8,4,4v16C24,22.2,22.2,24,20,24z M4,2C2.9,2,2,2.9,2,4v16 c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2H4z"></path>
            <path d="M8,24c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v22C9,23.6,8.6,24,8,24z"></path>
          </svg>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto scrollbar-hide">

        {/* Nav Group */}
        <div>
          {!isCollapsed && <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-3">Menu</p>}
          <div className="space-y-1">
            {navigations.map(item => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.name, 'All')}
                className={`w-full flex items-center p-2.5 rounded-xl transition-all group cursor-pointer ${
                  isNavActive(item.name)
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              >
                <span className={`${isNavActive(item.name) ? 'text-black' : 'group-hover:text-indigo-400'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="text-sm font-medium ml-3">{item.name}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Group - Only show if on Home */}
        {activeNavigation === 'Home' && (
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            {!isCollapsed && <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-3">Categories</p>}
            <div className="space-y-1">
              {categories.map(item => {
                const isActive = selectedCategory === item.name && item.name !== 'All';
                return (
                  <button
                    key={item.name}
                    onClick={() => onNavigate('Home', item.name)}
                    className={`w-full flex items-center p-2.5 rounded-xl transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                  >
                    <span className={isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400'}>
                      {item.icon}
                    </span>
                    {!isCollapsed && <span className="text-sm font-medium ml-3">{item.name}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>


    </div>
  );
}
