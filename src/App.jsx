import React, { useState } from 'react';
import Sidebar from './components/ui/Sidebar';
import GridContent from './components/ui/GridContent';
import PreviewModal from './components/ui/PreviewModal';
import { animations as initialAnimations } from './data/animations';
import About from './components/tabs/About';
import MobileNavbar from './components/ui/MobileNavbar';
import TopLoader from './components/ui/TopLoader';
import { Plus } from 'lucide-react';
import CommunityGrid from './components/CummunityGrid';

// NEW: Import the Creation Flow Components
import CategorySelectModal from './components/models/CategorySelectModal';
import CreatorModal from './components/models/CreatorModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState('Home');
  const [previewType, setPreviewType] = useState('text');
  const [isNavigating, setIsNavigating] = useState(false);

  //  animations as state
  const [allAnimations, setAllAnimations] = useState(initialAnimations);

const addNewAnimation = (newAnim) => {
  const uniqueId = `anim${Date.now()}`; // Ensure it starts with a letter
  const animationWithId = {
    ...newAnim,
    id: uniqueId,
    // We force the duration here if the user didn't specify
    duration: newAnim.duration || '2s'
  };

  setAllAnimations((prev) => [animationWithId, ...prev]);
  setActiveNavigation('Community'); // Auto-redirect to see the result
};
  // NEW: Creation Flow State
  const [isCreating, setIsCreating] = useState(false);
  const [creationStep, setCreationStep] = useState(1); // 1: Select Category, 2: Code Editor
  const [newCategory, setNewCategory] = useState('box');

  // Unified Handler for Navigation (Home/About)
  const handleNavChange = (targetPath, category = null) => {
    setIsNavigating(true);
    setTimeout(() => {
      if (targetPath) setActiveNavigation(targetPath);
      if (category) setSelectedCategory(category);
      setActiveAnimation(null);
      setIsCreating(false); // Close creator if navigating away
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  // Specific Handler for opening a Preview
  const handleOpenPreview = animation => {
    setIsNavigating(true);
    setTimeout(() => {
      setActiveAnimation(animation);
      setIsCreating(false);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleClosePreview = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setActiveAnimation(null);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  // NEW: Creation Flow Handlers
  const handleStartCreating = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsCreating(true);
      setCreationStep(1);
      setActiveAnimation(null); // Clear active preview
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleCategorySelect = category => {
    setNewCategory(category);
    setCreationStep(2);
  };

  const handleCloseCreator = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsCreating(false);
      setCreationStep(1);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  return (
    <>
      <MobileNavbar activeNavigation={activeNavigation} setActiveNavigation={handleNavChange} />

      <div className="overflow-hidden h-screen w-full flex flex-col md:flex-row items-start bg-[#050505]">
        <TopLoader isLoading={isNavigating} />

        <aside className="hidden md:block h-full shrink-0">
          <Sidebar
            selectedCategory={selectedCategory}
            activeNavigation={activeNavigation}
            previewType={previewType}
            setPreviewType={setPreviewType}
            onNavigate={handleNavChange}
            // Pass the start creation handler to the Sidebar
            onStartCreating={handleStartCreating}
          />


        </aside>

        <main className="border border-zinc-900 flex-1 overflow-x-hidden overflow-y-auto scroll-smooth h-full w-full relative">
          <div
            key={
              isCreating
                ? `creator-${creationStep}`
                : activeAnimation
                  ? activeAnimation.id
                  : activeNavigation
            }
            className="animate-in fade-in zoom-in-95 duration-500 h-full w-full"
          >
            {/* Logic Tree: Creator Mode > Preview Mode > Home/About */}
            {isCreating ? (
              creationStep === 1 ? (
                <CategorySelectModal onSelect={handleCategorySelect} onClose={handleCloseCreator} />
              ) : (
                <CreatorModal category={newCategory} onClose={handleCloseCreator} onSave={addNewAnimation} />
              )
            ) : activeAnimation ? (
              <PreviewModal
                animation={activeAnimation}
                onClose={handleClosePreview}
                previewType={previewType}
              />
            ) : (
              <>
                {activeNavigation === 'Home' && (
                  <GridContent
                    animations={allAnimations}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    onCardClick={handleOpenPreview}
                    previewType={previewType}
                    setPreviewType={setPreviewType}
                    handleStartCreating={handleStartCreating}
                  />
                    )}

                    {activeNavigation === 'Community' && !activeAnimation && !isCreating && (
          <CommunityGrid
            animations={allAnimations}
            onCardClick={handleOpenPreview}
            previewType={previewType}
          />
        )}

                {activeNavigation === 'About' && (
                  <div className="h-full overflow-y-auto">
                    <About />
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
