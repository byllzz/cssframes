import React, { useState } from 'react';
import { Menu, X, ChevronDown, Rocket, Plus } from 'lucide-react';

export default function Navbar({
  activeNavigation,
  setActiveNavigation,
  handleStartCreating,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['About'];

  return (
    <>
      {/* top wrap */}
      <nav className="bg-[#050505] w-full font-outfit px-4 lg:px-4 ">
        <div className="max-w-full mx-auto flex items-center justify-between h-16">
          {/* left: nav */}
          <div
            onClick={() => (window.location.href = 'https://cssframes.vercel.app')}
            className="flex items-center gap-6 relative left-[5px]"
          >
            <div className="flex items-center gap-0.5 group cursor-pointer">
              <span className="text-purple-500 font-black text-2xl tracking-tighter transition-transform group-hover:-rotate-6">
                CSS
              </span>
              <span className="text-white font-black text-2xl tracking-tighter uppercase">
                frames
              </span>
            </div>

            {/* desk links */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-white group cursor-pointer bg-[#161616] px-4 py-[7.5px] rounded-[5px] transition-all text-[15px] font-medium tracking-wider">
                Elements <ChevronDown size={14} className="text-white group-hover:rotate-180" />
              </button>

              {navLinks.map(item => (
                <button
                  key={item}
                  onClick={() => setActiveNavigation(item)}
                  className={`text-[15px] tracking-wider font-medium px-4 py-[7.5px] rounded-[5px] cursor-pointer transition-all ${
                    activeNavigation === item
                      ? ' bg-[#161616] text-white'
                      : 'text-white hover:bg-[#161616]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => handleStartCreating()}
                className="flex items-center gap-2 bg-gradient-to-br from-purple-600 to-blue-600 hover:brightness-110 text-white px-4 py-2.5 rounded-[5px] text-[14px] font-normal cursor-pointer transition-all shadow-lg shadow-purple-500/10"
              >
                <Plus size={18} /> Create
              </button>

              <button className="flex items-center gap-2 bg-[#161616] text-white px-5 py-2.5 rounded-[5px] text-[15px] tracking-wide font-medium hover:bg-zinc-800 transition-all cursor-pointer">
                <Rocket size={18} className="text-white" />
                <span className="hidden lg:inline">Join the Community</span>
              </button>
            </div>

            {/* mob toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-whitetransition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* FIXED mobile menu overlay */}
      {isOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-[#050505] border-b border-zinc-800 p-5 animate-in fade-in slide-in-from-top-4 z-[250] shadow-2xl">
          <div className="flex flex-col gap-3">
            <button className="w-full flex justify-between items-center p-4 rounded-[8px] bg-zinc-900 text-white font-medium">
              Elements <ChevronDown size={20} />
            </button>

            {navLinks.map(item => (
              <button
                key={item}
                onClick={() => {
                  setActiveNavigation(item);
                  setIsOpen(false);
                }}
                className="w-full text-left p-4 text-zinc-400 hover:text-white font-semibold rounded-2xl hover:bg-zinc-900/50"
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
                className="flex items-center gap-2 bg-gradient-to-br from-purple-600 to-blue-600 hover:brightness-110 text-white px-4 py-2.5 rounded-[5px] text-[14px] font-normal cursor-pointer transition-all shadow-lg shadow-purple-500/10"
              >
                <Plus size={20} /> Create
              </button>

              <button className="flex items-center gap-2 bg-[#161616] text-white px-5 py-2.5 rounded-[5px] text-[15px] tracking-wide font-medium hover:bg-zinc-800 transition-all cursor-pointer">
                <Rocket size={18} /> Join
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
