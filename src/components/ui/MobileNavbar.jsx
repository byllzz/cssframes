import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export default function MobileNavbar({ activeNavigation, setActiveNavigation }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="md:hidden fixed h-16 top-0 left-0 w-full z-[200] px-1 backdrop-blur-2xl">
      {/*  Header */}
      <div className=" p-4 flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-zinc-800 rounded-lg">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <h1 className="text-white font-medium tracking-tight">Cssframes</h1>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-400 hover:text-white transition-colors p-1"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-0 w-[50%] bg-[#121212] border border-zinc-800 rounded-[2rem] p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-2">
            {['Home', 'About', 'Settings'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveNavigation(item);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-4 rounded-xl font-medium transition-all ${
                  activeNavigation === item
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              v1.0.4 Beta
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
