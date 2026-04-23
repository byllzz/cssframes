import React, { useState, useRef } from 'react';
import { Menu, X, ChevronDown, Rocket, Plus } from 'lucide-react';
import Elements from './Elements';

export default function Navbar({
  activeNavigation,
  onNavigate,
  handleStartCreating,
  animations,
  categories = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['About' , "Docs" ,
"Library" ,
"Playground" ,
"Blog"];

  const [showElements, setShowElements] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);

  const timeoutRef = useRef(null);

  return (
    <>
      <nav className="bg-[#050505] w-full font-grotesk px-4 lg:px-4 ">
        <div className="max-w-full mx-auto flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center gap-8">
            <div
             onClick={() => {
  onNavigate('Home' ,null);

}}
              className="flex items-center gap-0.5 group cursor-pointer select-none"
            >
              <span className="text-purple-500 font-black text-2xl tracking-tighter transition-transform group-hover:-rotate-6">
                CSS
              </span>
              <span className="text-white font-black text-2xl tracking-tighter uppercase">
                frames
              </span>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-2 relative">
              {/* ELEMENTS */}
              <div className="relative">
                <button
                  className="flex items-center gap-1.5 text-white bg-[#161616] px-4 py-[7.5px] rounded-[5px] text-[15px] font-medium tracking-tight hover:bg-zinc-800"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setShowElements(true);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setShowElements(false);
                    }, 120);
                  }}
                >
                  Elements
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      showElements ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-0 top-full mt-2 z-50 transition-all duration-150 ${
                    showElements
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-1'
                  }`}
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setShowElements(true);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setShowElements(false);
                    }, 120);
                  }}
                >
                  <div className="w-max">
                    <Elements
                      animations={animations}
                      categories={categories}
                      onNavigate={cat => {
                        onNavigate('Home', cat);
                        setShowElements(false);
                      }}
                    />
                  </div>
                </div>
              </div>

              {navLinks.map(item => (
                <button
                  key={item}
                  onClick={() => onNavigate(item)}
                  className={`text-[15px] tracking-tight font-medium px-4 py-[7.5px] rounded-[5px] transition-all ${
                    activeNavigation === item
                      ? 'bg-[#161616] text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-[#161616]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handleStartCreating}
                className="flex items-center gap-2 bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-[5px] text-[14px]"
              >
                <Plus size={18} /> Create
              </button>

              {/* <button className="flex items-center gap-2 bg-[#161616] text-white px-5 py-2.5 rounded-[5px] text-[15px]">
                <Rocket size={18} />
                <span className="hidden lg:inline">Join the Community</span>
              </button> */}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white/90 p-2 hover:bg-zinc-900 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-[#050505] p-5 z-[250] overflow-y-auto h-screen scrollbar-hide">
          <div className="flex flex-col">
            <button
              className="flex justify-between items-center py-2 px-4 rounded bg-zinc-900 text-white"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              Categories
              <ChevronDown
                size={20}
                className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {showDropdown && (
              <div className="mt-2 flex flex-col">
                {categories.map(item => (
                  <button
                    key={item.name}
                    onClick={() => {
                      onNavigate('Home', item.name);
                      setTimeout(() => setIsOpen(false), 500);
                    }}
                    className="py-4 px-4 text-left text-zinc-300 hover:text-white flex items-center gap-3"
                  >
                  <item.icon size={18} />  {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {navLinks.map(item => (
            <button
              key={item}
              onClick={() => {
                onNavigate(item);
                setIsOpen(false);
              }}
              className={`w-full text-left p-4 rounded-xl ${
                activeNavigation === item
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}

          <div className="h-px bg-zinc-900 my-2" />

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                handleStartCreating();
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-3 rounded"
            >
              <Plus size={20} /> Create
            </button>
            {/*
            <button className="flex items-center justify-center gap-2 bg-[#161616] text-white px-5 py-3 rounded">
              <Rocket size={18} /> Join
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}
