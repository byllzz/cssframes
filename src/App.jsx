import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import GridContent from './components/GridContent'
import PreviewModal from './components/PreviewModal'
import { animations } from './data/animations'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAnimation, setActiveAnimation] = useState(null);

  return (
    <div className="overflow-hidden h-screen w-full flex flex-row items-start bg-[#0f0f0f]">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Grid */}
      <GridContent
        animations={animations}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onCardClick={setActiveAnimation}
      />

      {/* Modal */}
      {activeAnimation && (
        <PreviewModal
          animation={activeAnimation}
          onClose={() => setActiveAnimation(null)}
        />
      )}
    </div>
  );
}
