import React, { useState } from 'react';
import Sidebar from './components/ui/Sidebar';
import GridContent from './components/ui/GridContent';
import PreviewModal from './components/ui/PreviewModal';
import { animations as initialAnimations } from './data/animations';
import About from './components/tabs/About';
import Navbar from './components/ui/Navbar';
import TopLoader from './components/ui/TopLoader';
import CommunityGrid from './components/ui/CummunityGrid';
import CategorySelectModal from './components/models/CategorySelectModal';
import CreatorModal from './components/models/CreatorModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState('Home');
  const [previewType, setPreviewType] = useState('text');
  const [isNavigating, setIsNavigating] = useState(false);
  const [allAnimations, setAllAnimations] = useState(initialAnimations);
  const [isCreating, setIsCreating] = useState(false);
  const [creationStep, setCreationStep] = useState(1);
  const [newCategory, setNewCategory] = useState('box');

  const addNewAnimation = (newAnim) => {
    const uniqueId = `anim${Date.now()}`;
    const animationWithId = {
      ...newAnim,
      id: uniqueId,
      duration: newAnim.duration || '2s',
    };

    setAllAnimations((prev) => [animationWithId, ...prev]);
    setIsCreating(false);
    setActiveNavigation('Community');
  };

  const handleNavChange = (targetPath, category = null) => {
    setIsNavigating(true);
    setTimeout(() => {
      if (targetPath) setActiveNavigation(targetPath);
      if (category) setSelectedCategory(category);
      setActiveAnimation(null);
      setIsCreating(false);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleOpenPreview = (animation) => {
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

  const handleStartCreating = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsCreating(true);
      setCreationStep(1);
      setActiveAnimation(null);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleCategorySelect = (category) => {
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
      <TopLoader isLoading={isNavigating} />
      <div className="h-screen w-full bg-[#050505] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide">
        {/* Navigation Bar */}
        <div className="md:block">
          <Navbar
            activeNavigation={activeNavigation}
            setActiveNavigation={handleNavChange}
            handleStartCreating={handleStartCreating}
            isNavigating={isNavigating}
          />
        </div>

        <div className="flex flex-col md:flex-row w-full min-h-full">
          {/* Persistent Sidebar */}
          <aside className="hidden md:block sticky top-0 h-screen shrink-0 bg-[#050505] z-10">
            <Sidebar
              selectedCategory={selectedCategory}
              activeNavigation={activeNavigation}
              onNavigate={handleNavChange}
            />
          </aside>

          {/* Main Display Area */}
          <main
            className="flex-1 animate-in fade-in zoom-in-95 duration-500 scrollbar-hide"
            key={isCreating ? `creator-${creationStep}` : activeAnimation?.id || activeNavigation}
          >
            <div className="py-4 md:py-8">
              {/* CREATOR MODE LOGIC */}
              {isCreating ? (
                creationStep === 1 ? (
                  <CategorySelectModal
                    onSelect={handleCategorySelect}
                    onClose={handleCloseCreator}
                  />
                ) : (
                  <CreatorModal
                    category={newCategory}
                    onClose={handleCloseCreator}
                    onSave={addNewAnimation}
                    handleStartCreating={handleStartCreating}
                  />
                )
              ) : activeAnimation ? (
                /*  PREVIEW MODE LOGIC */
                <PreviewModal
                  animation={activeAnimation}
                  onClose={handleClosePreview}
                  previewType={previewType}
                />
              ) : (
                /*  STANDARD NAVIGATION LOGIC */
                <div className="min-h-[110vh]">
                  {activeNavigation === 'Home' && (
                    <GridContent
                      animations={allAnimations}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedCategory={selectedCategory}
                      onCardClick={handleOpenPreview}
                      previewType={previewType}
                      setPreviewType={setPreviewType}
                    />
                  )}

                  {activeNavigation === 'Community' && (
                    <CommunityGrid
                      animations={allAnimations}
                      onCardClick={handleOpenPreview}
                      previewType={previewType}
                      handleStartCreating={handleStartCreating}

                    />
                  )}

                  {activeNavigation === 'About' && <About />}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
