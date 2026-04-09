import React, { useState } from 'react';
import Sidebar from './components/ui/Sidebar';
import GridContent from './components/ui/GridContent';
import PreviewModal from './components/ui/PreviewModal';
import { animations } from './data/animations';
import About from './components/tabs/About';
import MobileNavbar from './components/ui/MobileNavbar';
import TopLoader from './components/ui/TopLoader';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState('Home');
  const [previewType, setPreviewType] = useState('text');
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavChange = (targetPath, category = null) => {
    setIsNavigating(true);

    setTimeout(() => {
      //  Page Navigation
      if (targetPath) setActiveNavigation(targetPath);
      //  Category Filtering
      if (category) setSelectedCategory(category);
      //  Close any open modals/panels automatically
      setActiveAnimation(null);
    }, 700);

    setTimeout(() => {
      setIsNavigating(false);
    }, 700);
  };
  return (
    <>
      {/*  Mobile Navbar  */}
      <MobileNavbar activeNavigation={activeNavigation} setActiveNavigation={handleNavChange} />
      <div className="overflow-hidden h-screen w-full flex flex-col md:flex-row items-start bg-black">
        {/* Loader */}
        <TopLoader isLoading={isNavigating} />
        {/*  Sidebar - Desktop only */}
        <aside className="hidden md:block h-full">
          <Sidebar
            selectedCategory={selectedCategory}
            activeNavigation={activeNavigation}
            previewType={previewType}
            setPreviewType={setPreviewType}
            onNavigate={handleNavChange}
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 h-full w-full overflow-hidden">
          <div key={activeNavigation} className="animate-in fade-in zoom-in-95 duration-500 h-full">
            {activeNavigation === 'Home' && (
              <GridContent
                animations={animations}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                onCardClick={setActiveAnimation}
                previewType={previewType}
                setPreviewType={setPreviewType}
              />
            )}

            {activeNavigation === 'About' && (
              <div className="h-full overflow-y-auto">
                <About />
              </div>
            )}
          </div>
        </main>

        {/*  Modal */}
        {activeAnimation && (
          <PreviewModal animation={activeAnimation} onClose={() => setActiveAnimation(null)} />
        )}
      </div>
    </>
  );
}
