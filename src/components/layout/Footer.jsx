import React from 'react';
import { Copyright, Scale } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub  } from 'react-icons/fa6';
export default function Footer() {
  const footerLinks = {
    Information: ['Blog', 'Post Guidelines', 'Give feedback', 'Report bug'],
    Legal: ['Terms and Conditions', 'Privacy policy', 'Cookie policy', 'Disclaimer']
  };

  return (
    <footer className="w-full bg-[#050505] text-zinc-400 py-16 px-6 md:px-10 border-t border-white/5 font-outfit">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">

        {/* Brand Section */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-tighter italic relative right-1">
              <span className="text-indigo-500 ">CSS</span>Frames
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium leading-relaxed max-w-[300px]">
              CSSFrames | The open-source universe of high-performance CSS animations.
            </p>

            <div className="space-y-1">
              <div className="flex items-center gap-3 text-white font-bold text-sm relative right-1.5">
                <span className=" p-1">
                <Scale size={18} /></span>
                <span className=" font-heading text-[12px] tracking-wide">MIT License</span>
              </div>
              <p className="text-xs leading-relaxed max-w-[280px] text-zinc-400">
                All elements on this site are open-source and published under the
                <a href="#" className="text-zinc-300 hover:text-white underline underline-offset-4 ml-1 transition-colors">MIT License</a>.
              </p>
            </div>
          </div>

          {/* Social Icons  */}
          <div className="flex items-center gap-4 relative right-2">
            {[
              { icon: <FaXTwitter size={18} />, href: "#" },
              { icon: <FaGithub size={18} />, href: "#" },

            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-9 h-9 flex items-center justify-center"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Spacer for Large Screens */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="space-y-5 lg:col-span-1">
            <h4 className="text-white font-heading font-bold text-[15px]  tracking-normal">{title}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] font-medium hover:text-white transition-all  inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
          <span>2026</span>
          <Copyright size={12} className="mx-0.5" />
          <span>All rights reserved — CSSFrames.io</span>
        </div>

        <div className="flex items-center gap-6">
           <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.3em]">
             Built for performance
           </span>
        </div>
      </div>
    </footer>
  );
}
