import React from 'react';
import {  Copyright, Disc as Discord } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    // Games: ['Azeron.ai', 'Tavernia.io'],
    // Resources: ['Pixelrepo.com', 'Cssbuttons.io', 'Neumorphism.io', 'Browsergames.gg'],
    Information: ['Blog', 'Post Guidelines', 'Give feedback', 'Report bug'],
    Legal: ['Terms and Conditions', 'Privacy policy', 'Cookie policy', 'Disclaimer']
  };

  return (
    <footer className="w-full bg-[#050505] text-zinc-400 py-16 px-6 md:px-10 border-t border-white/5 font-outfit">
      <div className="max-w-full px-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">

        {/* Brand Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-tighter italic">
              <span className="text-indigo-500">CSS</span>Frames
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium">CSSFrames | The universe of CSS Animations</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span className="scale-125">⚖️</span>
                <span className="uppercase tracking-widest text-[11px]">MIT License</span>
              </div>
              <p className="text-xs leading-relaxed max-w-[280px]">
                All content (UI elements) on this site are published under the
                <a href="#" className="text-zinc-300 hover:text-white underline ml-1">MIT License</a>.
              </p>
            </div>
          </div>

          {/* Socials */}
          {/* <div className="flex items-center gap-5 pt-2">
            <a href="#" className="hover:text-white transition-colors">I</a>
            <a href="#" className="hover:text-white transition-colors">T</a>
            <a href="#" className="hover:text-white transition-colors"><Discord size={20} /></a>
          </div> */}
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-tight">{title}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5">
        <p className="text-[11px] flex items-center  gap-1 font-medium tracking-wide">
          2026 <Copyright size={15} />All rights reserved. - CssFrames
        </p>
      </div>
    </footer>
  );
}
