import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import GridContent from './components/GridContent'
import PreviewModal from './components/PreviewModal'
import { animations } from './data/animations'
// import Home from './components/Home'
import About from './components/About'


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState("Home");



  return (
    <div className="overflow-hidden h-screen w-full flex flex-row items-start bg-[#0f0f0f]">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setActiveNavigation={setActiveNavigation}
        activeNavigation={activeNavigation}
      />

      {/* Grid */}
      {activeNavigation === 'Home' && (
        <GridContent
          animations={animations}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          onCardClick={setActiveAnimation}
        />
      )}
      {activeNavigation === 'About' && <About />}

      {/* Modal */}
      {activeAnimation && (
        <PreviewModal animation={activeAnimation} onClose={() => setActiveAnimation(null)} />
      )}
    </div>
  );
}
