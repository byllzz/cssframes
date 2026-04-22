import React  from 'react';
import {
  Users,
  LayoutGrid,
  MousePointer2,
  Loader2,
  LogIn,
  Type,
  CreditCard,
  Shapes,
  Zap,
  Monitor,
  Box,
  Sparkles,
} from 'lucide-react';

const navigations = [{ name: 'Community', icon: <Users size={20} /> }];


const categories = [
  { name: 'All', icon: <LayoutGrid size={18} strokeWidth={2.5} /> },
  { name: 'Buttons', icon: <MousePointer2 size={18} strokeWidth={2.5} /> },
  { name: 'Loaders', icon: <Loader2 size={18} strokeWidth={2.5} className="animate-spin" /> },
  { name: 'Arrival', icon: <LogIn size={18} strokeWidth={2.5} /> },
  { name: 'Transitions', icon: <Zap size={18} strokeWidth={2.5} /> },
  { name: 'Text', icon: <Type size={18} strokeWidth={2.5} /> },
  { name: 'Icons', icon: <Sparkles size={18} strokeWidth={2.5} /> },
  { name: 'Scroll', icon: <Monitor size={18} strokeWidth={2.5} /> },
];


export default function Sidebar({
  selectedCategory,
  activeNavigation,
  onNavigate,
  animations = [],
}) {

  const isNavActive = (name) => {
   return activeNavigation === name;
  };

  // total animations count
  const totalAnimations = animations.length;
  const totalCommunityAnimations = animations.filter(item => item.isCommunity).length;

  // get count per category
  const getCategoryCount = (categoryName) => {
    if (categoryName === 'All') return totalAnimations;
    return animations.filter((item) => item.category === categoryName).length;
  };


  return (
    <div className="h-full w-[230px] pt-6 bg-[#050505] flex flex-col font-outfit shrink-0 ">
      <nav className="flex-1 px-4  overflow-y-auto no-scrollbar pt-2">
        {/* library section */}
        <section>
          {/* Heading with total */}
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-semibold text-white tracking-tight">Animations</h2>
            <span className="text-xs font-semibold text-zinc-500">{totalAnimations}</span>
          </div>

          <div className="space-y-[2px]">
            {categories.map(item => {
              const isActive =
                activeNavigation === 'Home' &&
                ((item.name === 'All' && selectedCategory === 'All') ||
                  selectedCategory === item.name);

              const count = getCategoryCount(item.name);

              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate('Home', item.name)}
                  className={`w-full flex items-center cursor-pointer justify-between px-3 py-[9px] rounded-[8px] transition-all group ${
                    isActive
                      ? 'bg-[#161616] text-white'
                      : 'text-white hover:bg-[#161616] hover:text-white'
                  }`}
                >
                  {/* Left */}
                  <div className="flex items-center min-w-0">
                    <span
                      className={isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[14px] font-semibold ml-3 tracking-tight truncate">
                      {item.name}
                    </span>
                  </div>

                  {/* Right count */}
                  <span
                    className={`text-[11px] font-semibold ${
                      isActive ? 'text-white' : 'text-white'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* community */}
        <section>
          <div className="space-y-1.5">
            {navigations.map(item => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.name, 'All')}
                className={`w-full flex items-center cursor-pointer justify-between px-3 py-2.5 rounded-[8px] transition-all group ${
                  isNavActive(item.name)
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-[#161616] hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <span
                    className={isNavActive(item.name) ? 'text-black' : 'group-hover:text-white'}
                  >
                    {item.icon}
                  </span>

                  <span className="text-[17px] font-semibold ml-3 tracking-tight">{item.name}</span>
                </div>

                <span
                  className={`text-[11px] font-semibold  ${
                    isNavActive(item.name)
                      ? 'text-black'
                      : 'text-white'
                  }`}
                >
                  {totalCommunityAnimations}
                </span>
              </button>
            ))}
          </div>
        </section>
      </nav>
    </div>
  );
}
