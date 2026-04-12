import React, { useState } from 'react';
import Sidebar from './components/ui/Sidebar';
import GridContent from './components/ui/GridContent';
import PreviewModal from './components/ui/PreviewModal';
import { animations, animations as initialAnimations } from './data/animations';
import About from './components/tabs/About';
import Navbar from './components/ui/Navbar';
import TopLoader from './components/ui/TopLoader';
import CommunityGrid from './components/ui/CummunityGrid';
import CategorySelectModal from './components/models/CategorySelectModal';
import CreatorModal from './components/models/CreatorModal';
import SharePanel from './components/models/SharePanel'; // New Import
import Footer from './components/layout/Footer';

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
  const [selectedShare, setSelectedShare] = useState(null); // Share State

  // --- ACTIONS ---

  const addNewAnimation = (newAnim) => {
    const uniqueId = `anim-${Date.now()}`;
    const animationWithId = {
      ...newAnim,
      id: uniqueId,
      isCommunity: true,
      author: "Local User", // Or handle auth here
      duration: newAnim.duration || '2s',
    };

    setAllAnimations((prev) => [animationWithId, ...prev]);
    setIsCreating(false);
    setActiveNavigation('Community');
  };

  const handleNavChange = (targetPath, category = null) => {
    setIsNavigating(true);
    // Smooth transition delay
    setTimeout(() => {
      if (targetPath) setActiveNavigation(targetPath);
      if (category) setSelectedCategory(category);
      setActiveAnimation(null);
      setIsCreating(false);
      setSelectedShare(null);
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

  const handleStartCreating = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsCreating(true);
      setCreationStep(1);
      setActiveAnimation(null);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  // --- RENDER HELPERS ---

  return (
    <>
      <TopLoader isLoading={isNavigating} />

      {/* Global Share Panel Overlay */}
      <SharePanel
        animation={selectedShare}
        isOpen={!!selectedShare}
        onClose={() => setSelectedShare(null)}
      />

      <div className="h-screen w-full bg-[#050505] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide text-zinc-200 selection:bg-white selection:text-black">
        {/* Sticky Navbar */}
        <Navbar
          activeNavigation={activeNavigation}
          setActiveNavigation={handleNavChange}
          handleStartCreating={handleStartCreating}
          isNavigating={isNavigating}
        />

        <div className="flex flex-col md:flex-row w-full min-h-full">
          {/* Persistent Sidebar */}
          <aside className="hidden md:block sticky top-0 h-screen shrink-0 bg-[#050505] border-r border-white/[0.02] z-10">
            <Sidebar
              selectedCategory={selectedCategory}
              activeNavigation={activeNavigation}
              onNavigate={handleNavChange}
            />
          </aside>

          {/* Main Display Area */}
          <main
            className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-700 scrollbar-hide"
            key={isCreating ? `creator-${creationStep}` : activeAnimation?.id || activeNavigation}
          >
            <div className="py-4 md:py-0">
              {/* 1. CREATOR MODE */}
              {isCreating ? (
                <div className="min-h-screen flex items-center justify-center p-6">
                  {creationStep === 1 ? (
                    <CategorySelectModal
                      onSelect={cat => {
                        setNewCategory(cat);
                        setCreationStep(2);
                      }}
                      onClose={() => setIsCreating(false)}
                    />
                  ) : (
                    <CreatorModal
                      category={newCategory}
                      onClose={() => setIsCreating(false)}
                      onSave={addNewAnimation}
                      handleStartCreating={handleStartCreating}
                    />
                  )}
                </div>
              ) : activeAnimation ? (
                /* 2. PREVIEW MODE */
                <div className="p-4 md:p-10">
                  <PreviewModal
                    animation={activeAnimation}
                    onClose={() => setActiveAnimation(null)}
                    previewType={previewType}
                  />
                </div>
              ) : (
                /* 3. STANDARD NAVIGATION */
                <div className="min-h-screen">
                  {activeNavigation === 'Home' && (
                    <GridContent
                      animations={allAnimations}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedCategory={selectedCategory}
                      onCardClick={handleOpenPreview}
                      previewType={previewType}
                      setPreviewType={setPreviewType}
                      onShareClick={anim => setSelectedShare(anim)} // Passed down to cards
                    />
                  )}

                  {activeNavigation === 'Community' && (
                    <CommunityGrid
                      animations={allAnimations}
                      onCardClick={handleOpenPreview}
                      previewType={previewType}
                      handleStartCreating={handleStartCreating}
                          onShareClick={anim => setSelectedShare(anim)}
                          onBack={() => handleNavChange('Home')} // For go back to main
                    />
                  )}

                  {activeNavigation === 'About' &&
                  <About onBack={() => handleNavChange('Home')} animations={animations} />}
                </div>
              )}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
