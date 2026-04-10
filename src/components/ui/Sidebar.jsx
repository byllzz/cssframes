import React from 'react';
import { LayoutGrid, Layers, CirclePlay, Loader, SlidersVertical, Users } from 'lucide-react';

/* navs: secondary menu items */
const navigations = [
  { name: 'Community', icon: <Users size={20} /> },
];

/* cats: 'All' functions as Home/Reset */
const categories = [
  { name: 'All', icon: <LayoutGrid size={20} /> },
  { name: 'Buttons', icon: <CirclePlay size={20} /> },
  { name: 'Loaders', icon: <Loader size={20} className="animate-spin" /> },
  { name: 'Entrances', icon: <Layers size={20} /> },
  { name: 'Transitions', icon: <SlidersVertical size={20} /> },
];

export default function Sidebar({ selectedCategory, activeNavigation, onNavigate }) {
  // active check for social section
  const isNavActive = (name) => activeNavigation === name;

  return (
    <div className="h-full w-[230px] pt-6 bg-[#050505] flex flex-col font-outfit shrink-0">
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar pt-2">
        {/* library section */}
        <section className="animate-in slide-in-from-left-2 duration-300">
          <div className="space-y-1.5">
            {categories.map(item => {
              // CHANGE: Only active if navigation is 'Home' AND (it's 'All' or matches selection)
              const isActive = activeNavigation === 'Home' &&
                ((item.name === 'All' && selectedCategory === 'All') || selectedCategory === item.name);

              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate('Home', item.name)}
                  className={`w-full flex items-center px-3 py-[9px] rounded-[8px] transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-[#161616] text-white shadow-sm'
                      : 'text-zinc-400 hover:bg-[#161616] hover:text-white'
                  }`}
                >
                  <span className={`transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className="text-[14px] font-semibold ml-3 tracking-tight">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* social creation */}
        <section>
          <div className="space-y-1.5">
            {navigations.map(item => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.name, 'All')}
                className={`w-full flex items-center px-3 py-2.5 rounded-[8px] transition-all group cursor-pointer ${
                  isNavActive(item.name)
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:bg-[#161616] hover:text-white'
                }`}
              >
                <span className={isNavActive(item.name) ? 'text-black' : 'group-hover:text-white'}>
                  {item.icon}
                </span>
                <span className="text-[14px] font-semibold ml-3 tracking-tight">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      </nav>
    </div>
  );
}
