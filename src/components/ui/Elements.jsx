import React from "react";
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



export default function Elements({ animations = [] , onNavigate }) {
  const categories = [
    { name: 'All', icon: <LayoutGrid size={18} strokeWidth={2.5} /> },
    { name: 'Buttons', icon: <MousePointer2 size={18} strokeWidth={2.5} /> },
    {
      name: 'Loaders',
      icon: <Loader2 size={18} strokeWidth={2.5} className="animate-spin" />,
    },
    { name: 'Arrival', icon: <LogIn size={18} strokeWidth={2.5} /> },
    { name: 'Transitions', icon: <Zap size={18} strokeWidth={2.5} /> },
    { name: 'Cards', icon: <CreditCard size={18} strokeWidth={2.5} /> },
    { name: 'Text', icon: <Type size={18} strokeWidth={2.5} /> },
    { name: 'Icons', icon: <Sparkles size={18} strokeWidth={2.5} /> },
    { name: 'Shapes', icon: <Shapes size={18} strokeWidth={2.5} /> },
    { name: 'Scroll', icon: <Monitor size={18} strokeWidth={2.5} /> },
    { name: 'Components', icon: <Box size={18} strokeWidth={2.5} /> },
  ];

  // get count per category
  const totalAnimations = animations.length;
  const getCategoryCount = categoryName => {
    if (categoryName === 'All') return totalAnimations;
    return animations.filter(item => item.category === categoryName).length;
  };



  return (
    <div className="w-[800px] h-[402px] bg-[#0f0f10] text-white p-5 rounded-[12px]">
      <div className="max-w-full grid grid-cols-1 lg:grid-cols-3 gap-2">

        {/* LEFT GRID */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categories.map((item) => {
            const count = getCategoryCount(item.name);
            return (
              <button
                onClick={() => {
                  console.log('CLICKED:', item.name);
                  onNavigate(item.name);
                }}
                key={item.name}
                className="bg-[#1a1a1c] hover:bg-[#222225] transition-all duration-200 rounded-[5px] px-2 py-1.5 flex items-center justify-between cursor-pointer border border-transparent hover:border-[#2a2a2d]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>

                <span className="text-sm text-gray-400">{count}</span>
              </button>
            );})}
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-[5px] p-6 bg-gradient-to-br from-purple-600 to-indigo-600 flex flex-col justify-between">

          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-3xl">
              🚀
            </div>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-xl font-semibold">
              We're on Social Media!
            </h2>
            <p className="text-sm text-white/80">
              Follow us to find out about new challenges, updates and posts
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button className="w-12 h-12 rounded-lg bg-black/30 hover:bg-black/50 transition" />
            <button className="w-12 h-12 rounded-lg bg-black/30 hover:bg-black/50 transition" />
            <button className="w-12 h-12 rounded-lg bg-black/30 hover:bg-black/50 transition" />
          </div>
        </div>

      </div>
    </div>
  );
}
