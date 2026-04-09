import React, { useState } from 'react';
import SettingsPanel from './SettingsPanel';
import AppearancePanel from './AppearancePanel'
import {
  LayoutGrid,
  Layers,
  Settings2,
  Globe,
  Palette,
  CircleQuestionMark,
  CirclePlay,
  Loader,
  SlidersVertical,
  Home,
  User,
} from 'lucide-react';


const navigations = [
  {name : "Home" , icon : <Home  size={20} />},
  {name : "About" , icon : <User size={20} />}
]

const categories = [
  { name: 'All', icon: <LayoutGrid size={20} />, count: 42 },
  { name: 'Buttons', icon: <CirclePlay size={20} />, count: 12 },
  { name: 'Loaders', icon: <Loader size={20} className='animate-spin' />, count: 8  },
  { name: 'Entrances', icon: <Layers size={20} />, count: 15 },
  { name: 'Transitions', icon: <SlidersVertical size={20} />, count: 7 },
];

const settings = [
  { name: 'Settings', icon: <Settings2 size={20} /> },
  { name: 'Appearance', icon: <Palette size={20}  /> },
];

export default function Sidebar({ selectedCategory, setSelectedCategory , activeNavigation, setActiveNavigation  , previewType , setPreviewType}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState(false);

  return (
    <div
      className={`h-screen bg-black border-r border-zinc-800 flex flex-col font-outfit transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[80px]' : 'w-[260px]'
      }`}
    >
      {/* Logo Section */}
      <div
        className={`p-6 flex items-center justify-between gap-3 mb-3 ${isCollapsed ? 'justify-center' : ''}`}
      >
        {!isCollapsed && (
          <div className="flex items-center animate-in fade-in duration-500">
            <div className="rotate-50">
              <svg height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.58571 7.75725C6.19518 7.36672 5.56202 7.36672 5.17149 7.75725C4.78097 8.14777 4.78097 8.78094 5.17149 9.17146L6.99988 10.9998H1.82855C1.27627 10.9998 0.828552 11.4476 0.828552 11.9998C0.828552 12.5521 1.27627 12.9998 1.82855 12.9998L7.00012 12.9998L5.17165 14.8283C4.78112 15.2189 4.78112 15.852 5.17165 16.2425C5.56217 16.6331 6.19533 16.6331 6.58586 16.2425L9.41429 13.4141C10.1953 12.6331 10.1952 11.3667 9.41413 10.5857L6.58571 7.75725Z"
                  fill="#fff"
                />
                <path
                  d="M17.4142 16.2428C17.8048 16.6333 18.4379 16.6333 18.8284 16.2428C19.219 15.8523 19.219 15.2191 18.8284 14.8286L17 13.0001H22.1716C22.7239 13.0001 23.1716 12.5524 23.1716 12.0001C23.1716 11.4478 22.7239 11.0001H17.0001L18.8285 9.17171C19.2191 8.78118 19.2191 8.14802 18.8285 7.75749C18.438 7.36697 17.8048 7.36697 17.4143 7.75749L14.5858 10.5859C13.8048 11.367 13.8048 12.6333 14.5858 13.4144L17.4142 16.2428Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <h1 className="font-medium text-xl tracking-tight text-white">Cssframes</h1>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer hover:bg-zinc-800 p-1 rounded-md transition-colors "
        >
          {/* Your SVG Icon (simplified here for brevity) */}
          <svg height={17} fill="#ccc" viewBox="0 0 24 24">
            <path d="M20,24H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h16c2.2,0,4,1.8,4,4v16C24,22.2,22.2,24,20,24z M4,2C2.9,2,2,2.9,2,4v16 c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2H4z"></path>
            <path d="M8,24c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v22C9,23.6,8.6,24,8,24z"></path>
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-hidden">
        <div className="mb-5">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-zinc-500 uppercase px-3 mb-2 animate-in fade-in">
              Navigations
            </p>
          )}

          {navigations.map(item => (
            <button
              key={item.name}
              onClick={() => {
                setActiveNavigation(item.name);
              }}
              className={`w-full flex items-center p-2.5 rounded-xl transition-all group cursor-pointer ${
                activeNavigation === item.name
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={
                    selectedCategory === item.name
                      ? 'text-indigo-400'
                      : 'group-hover:text-indigo-400'
                  }
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm font-medium animate-in slide-in-from-left-2">
                    {item.name}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {!isCollapsed && (
          <p className="text-xs font-semibold text-zinc-500 uppercase px-3 mb-2 animate-in fade-in">
            Categories
          </p>
        )}
        <div className="overflow-x-hidden overflow-y-auto h-65 ">
          {categories.map(item => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedCategory(item.name);
                setActiveNavigation('Home');
              }}
              className={`w-full flex items-center p-2.5 rounded-xl transition-all group cursor-pointer ${
                selectedCategory === item.name
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={
                    selectedCategory === item.name
                      ? 'text-indigo-400'
                      : 'group-hover:text-indigo-400'
                  }
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm font-medium animate-in slide-in-from-left-2">
                    {item.name}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 mt-auto border-t border-zinc-800 relative">
        {!isCollapsed && (
          <p className="text-xs font-semibold text-zinc-500 uppercase px-3 mb-2 animate-in fade-in">
            Settings
          </p>
        )}

        {settings.map(item => (
          <button
            onClick={() => setActivePanel(item.name)}
            key={item.name}
            className={`w-full flex items-center gap-3 p-2 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
          >
            {item.icon}
            {!isCollapsed && <span className="animate-in fade-in">{item.name}</span>}
          </button>
        ))}
        {/* this is our bottom settings panel */}
        <div
          className={`absolute z-99 -top-70 ${isCollapsed ? '-right-85' : '-right-60 '}`}
        >
          {activePanel === 'Settings' && <SettingsPanel onClose={setActivePanel} previewType={previewType} setPreviewType={setPreviewType} />}
          {activePanel === 'Appearance' && <AppearancePanel onClose={setActivePanel} />}
        </div>
      </div>
    </div>
  );
}


export function Panel() {
  return (
    <div className="h-auto w-80 rounded-[40px] bg-white text-black p-4">
      d
    </div>
  );
}
