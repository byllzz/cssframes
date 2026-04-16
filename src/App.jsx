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
import SharePanel from './components/models/SharePanel';
import Footer from './components/layout/Footer';
import DevelopmentPopup from './components/alerts/DevelopmentPopup';

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
  const [selectedShare, setSelectedShare] = useState(null);
  const [showDevPopup, setShowDevPopup] = useState(true);

  const addNewAnimation = newAnim => {
    const animationWithId = {
      ...newAnim,
      isCommunity: true,
      author: 'Local User',
      duration: newAnim.duration || '2s',
    };

    setAllAnimations(prev => [animationWithId, ...prev]);
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
      setSelectedShare(null);
    }, 400);

    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleOpenPreview = animation => {
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
      setSelectedShare(null);
    }, 400);

    setTimeout(() => setIsNavigating(false), 800);
  };

  return (
    <>
      <TopLoader isLoading={isNavigating} />

      {showDevPopup && (
        <DevelopmentPopup onClose={() => setShowDevPopup(false)} />
      )}

      <SharePanel
        animation={selectedShare}
        isOpen={!!selectedShare}
        onClose={() => setSelectedShare(null)}
      />

      {/* OUTER WRAPPER  */}
      <div className="min-h-screen w-full bg-[#050505] text-zinc-200 selection:bg-white selection:text-black">

        {/* SCROLL CONTAINER */}
        <div
          className={`h-screen overflow-y-auto scroll-smooth ${
            showDevPopup ? 'overflow-hidden' : ''
          }`}
        >

          {/* Navbar */}
          <Navbar
            activeNavigation={activeNavigation}
            setActiveNavigation={handleNavChange}
            handleStartCreating={handleStartCreating}
            isNavigating={isNavigating}
          />

          <div className="flex flex-col md:flex-row w-full">

            {/* SIDEBAR  */}
            {!isCreating && (
              <aside className="hidden md:block sticky top-0 self-start h-screen shrink-0 bg-[#050505]  z-10">
                <Sidebar
                  selectedCategory={selectedCategory}
                  activeNavigation={activeNavigation}
                  onNavigate={handleNavChange}
                  animations={allAnimations}
                />
              </aside>
            )}

            {/* MAIN CONTENT */}
            <main
              className={`flex-1 animate-in fade-in slide-in-from-bottom-2 duration-700 scrollbar-hide ${
                isCreating ? 'w-full' : ''
              }`}
              key={
                isCreating
                  ? `creator-${creationStep}`
                  : activeAnimation?.id || activeNavigation
              }
            >
              <div className="py-4 md:py-0">

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
                  <div className="p-4 md:pl-2 md:pr-3 md:py-9">
                    <PreviewModal
                      animation={activeAnimation}
                      onClose={() => setActiveAnimation(null)}
                      previewType={previewType}
                    />
                  </div>

                ) : (
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
                        onShareClick={anim => setSelectedShare(anim)}
                      />
                    )}

                    {activeNavigation === 'Community' && (
                      <CommunityGrid
                        animations={allAnimations}
                        onCardClick={handleOpenPreview}
                        previewType={previewType}
                        handleStartCreating={handleStartCreating}
                        onShareClick={anim => setSelectedShare(anim)}
                        onBack={() => handleNavChange('Home')}
                      />
                    )}

                    {activeNavigation === 'About' && (
                      <About
                        onBack={() => handleNavChange('Home')}
                        animations={allAnimations}
                      />
                    )}

                  </div>
                )}

              </div>
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
