import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { categories, categoryList } from './data/animationCategories';


// UI Components & Data
import Sidebar from './components/ui/Sidebar';
import GridContent from './components/ui/GridContent';
import PreviewModal from './components/models/PreviewModal';
import Navbar from './components/ui/Navbar';
import TopLoader from './components/ui/TopLoader';
import Footer from './components/layout/Footer';
import CategorySelectModal from './components/models/CategorySelectModal';
import CreatorModal from './components/models/CreatorModal';
import SharePanel from './components/models/SharePanel';
import DevelopmentPopup from './components/alerts/DevelopmentPopup';
import About from './components/tabs/About';
import CommunityGrid from './components/ui/CommunityGrid';
import { animations as initialAnimations } from './data/animations';
import Home from './components/pages/Home';

//  COMPONENT WITH PROPS
const DynamicRouteRenderer = ({
  allAnimations,
  searchQuery,
  setSearchQuery,
  handleOpenPreview,
  previewType,
  setPreviewType,
  setSelectedShare,
  activeAnimation,
  handleClosePreview,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return <Navigate to="/" replace />;


  const lowerId = id.toLowerCase();

  // Category Logic
  if (categoryList.includes(lowerId)) {
    const formattedCategory =
      lowerId === 'animations' ? 'All' : id.charAt(0).toUpperCase() + id.slice(1);
    return (
      <GridContent
        animations={allAnimations}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={formattedCategory}
        onCardClick={handleOpenPreview}
        previewType={previewType}
        setPreviewType={setPreviewType}
        onShareClick={anim => setSelectedShare(anim)}
      />
    );
  }

  // Animation Logic
  const currentAnim = activeAnimation || allAnimations.find(a => a.id === id);
  if (currentAnim) {
    return (
      <div className="p-4 md:pl-2 md:pr-3 md:py-9">
        <PreviewModal
          animation={currentAnim}
          onClose={handleClosePreview}
          previewType={previewType}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
      {/* Subtle background element for depth */}
      <div className="absolute size-64 bg-zinc-500/5 blur-[120px] pointer-events-none" />

      <div className="relative space-y-8 flex flex-col items-center">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Error 404</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Animation not found
          </h2>
          <p className="text-zinc-400 max-w-[280px] text-sm leading-relaxed mx-auto">
            The piece you're looking for might have been moved or doesn't exist yet.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="group relative px-8 py-3 bg-white text-black rounded-full font-medium text-sm transition-all duration-300 hover:bg-zinc-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span className="flex items-center gap-2">
            Back to Library
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // All states
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

  // all useEffects
  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path === 'about') setActiveNavigation('About');
    else if (path === 'community') setActiveNavigation('Community');
    else if (path === '') setActiveNavigation('Home');

    if (path && !['about', 'community'].includes(path)) {
      const found = allAnimations.find(a => a.id === path);
      if (found) setActiveAnimation(found);
    } else {
      setActiveAnimation(null);
    }
  }, [location.pathname, allAnimations]);

  const handleNavChange = (targetPath, category = null) => {
    setIsNavigating(true);
    setTimeout(() => {
      if (targetPath === 'Home') {
        const urlSlug =
          category?.toLowerCase() === 'all' ? 'animations' : category?.toLowerCase() || '';
        navigate(`/${urlSlug}`);
        setSelectedCategory(category || 'All');
        setActiveNavigation('Home');
      } else {
        const urlMap = { About: '/about', Community: '/community' };
        navigate(urlMap[targetPath] || '/');
        setActiveNavigation(targetPath);
      }
      setActiveAnimation(null);
      setIsCreating(false);
    }, 1000);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleOpenPreview = animation => {
    setIsNavigating(true);
    setTimeout(() => {
      setActiveAnimation(animation);
      navigate(`/${animation.id.toLowerCase().trim()}`);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleClosePreview = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setActiveAnimation(null);
      navigate('/animations');
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleStartCreating = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsCreating(true);
      setCreationStep(1);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  // for home Page
  const handleEnter = () => {
    if (!searchQuery.trim()) {
      setIsNavigating(true);

      setTimeout(() => {
        navigate('/animations');
        setIsNavigating(false);
      }, 400);

      return;
    }

    setIsNavigating(true);
    setTimeout(() => {
      navigate('/animations');
      setIsNavigating(false);
    }, 400);
  };

  // for title previews
  useEffect(() => {
    const baseName = 'CSSFrames';
    const path = location.pathname.substring(1).toLowerCase();

    const currentAnim = allAnimations.find(a => a.id.toLowerCase() === path);
    console.log('PATH:', path);
    console.log('FOUND ANIM:', currentAnim);
    console.log(
      'ALL IDS:',
      allAnimations.map(a => a.id),
    );
    let title = baseName;

    if (currentAnim) {
      title = `${currentAnim.title} made with CSS Keyframes | ${baseName}`;
    } else if (path === 'community') {
      const communityCount = allAnimations.filter(item => item.isCommunity).length;
      title = `${communityCount} Community Creations | CSSFrames Open-source Library of Pure CSS Animations`;
    } else if (path === 'about') {
      title = `Our Story | CSSFrames Open-source Library of Pure CSS Animations`;
    } else if (path === '') {
      title = `${baseName} | Open-source Library of Pure CSS Animations`;
    } else {
      // Category or /animations route
      const displayCategory = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

      if (selectedCategory === 'All') {
        title = `${allAnimations.length} CSS Animations: ${baseName}`;
      } else {
        const categoryCount = allAnimations.filter(
          item => item.category?.toLowerCase() === selectedCategory.toLowerCase(),
        ).length;
        title = `${categoryCount} ${displayCategory} Animations: ${baseName}`;
      }
    }

    document.title = title;
  }, [location.pathname, selectedCategory, allAnimations]);

  // for sidebar option store in localStorage
  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path === 'about') setActiveNavigation('About');
    else if (path === 'community') setActiveNavigation('Community');
    else if (path === '') setActiveNavigation('Home');
    else {
      setActiveNavigation('Home');
      if (path === 'animations') {
        setSelectedCategory('All');
      } else {
        const matchedCategory = categories.find(
          cat => cat.name.toLowerCase() === path.toLowerCase(),
        );
        if (matchedCategory) {
          setSelectedCategory(matchedCategory.name);
        }
      }
    }

    if (path && !['about', 'community'].includes(path)) {
      const found = allAnimations.find(a => a.id === path);
      if (found) setActiveAnimation(found);
    } else {
      setActiveAnimation(null);
    }
  }, [location.pathname, allAnimations]);

  // saving the community card in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cssframes_animations');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const communityAnims = parsed.filter(a => a && a.isCommunity && a.id && a.title);
          if (communityAnims.length > 0) {
            setAllAnimations([...communityAnims, ...initialAnimations]);
          }
        }
      }
    } catch (e) {
      console.error('Corrupted localStorage, clearing:', e);
      localStorage.removeItem('cssframes_animations');
    }
  }, []);

  //  save community only
  useEffect(() => {
    try {
      const communityOnly = allAnimations.filter(a => a.isCommunity);
      localStorage.setItem('cssframes_animations', JSON.stringify(communityOnly));
    } catch (e) {
      console.error('Failed to save:', e);
    }
  }, [allAnimations]);

  // Save to localStorage whenever animations change
  useEffect(() => {
    try {
      localStorage.setItem('cssframes_animations', JSON.stringify(allAnimations));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [allAnimations]);

  // Load creation state from localStorage on mount
  useEffect(() => {
    try {
      const savedStep = localStorage.getItem('cssframes_creation_step');
      const savedCategory = localStorage.getItem('cssframes_new_category');
      const savedIsCreating = localStorage.getItem('cssframes_is_creating');

      if (savedIsCreating === 'true') {
        setIsCreating(true);
        if (savedStep) setCreationStep(Number(savedStep));
        if (savedCategory) setNewCategory(savedCategory);
      }
    } catch (e) {
      console.error('Failed to load creation state', e);
    }
  }, []);

  // Save creation state whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cssframes_is_creating', String(isCreating));
      localStorage.setItem('cssframes_creation_step', String(creationStep));
      localStorage.setItem('cssframes_new_category', newCategory);
    } catch (e) {
      console.error('Failed to save creation state', e);
    }
  }, [isCreating, creationStep, newCategory]);

  // clearStorage logic
  const clearCreationStorage = () => {
    localStorage.removeItem('cssframes_is_creating');
    localStorage.removeItem('cssframes_creation_step');
    localStorage.removeItem('cssframes_new_category');
    localStorage.removeItem('cssframes_creator_draft');
  };

  return (
    <>
      {/* Global Overlays */}
      <div className="fixed top-0 left-0 w-full z-[20000] pointer-events-none">
        <TopLoader isLoading={isNavigating} />
      </div>

      <SharePanel
        animation={selectedShare}
        isOpen={!!selectedShare}
        onClose={() => setSelectedShare(null)}
      />

      <div className="h-screen w-full bg-[#050505] text-zinc-200 overflow-hidden">
        <div className="h-full overflow-y-auto scroll-smooth flex flex-col">
          {/* Persistent Navbar */}
          <nav className="">
            <Navbar
              activeNavigation={activeNavigation}
              onNavigate={handleNavChange}
              handleStartCreating={handleStartCreating}
              isNavigating={isNavigating}
              animations={allAnimations}
              categories={categories}
            />
          </nav>

          <main className="flex-1 flex flex-col md:flex-row">
            <Routes>
              {/* HOME ROUTE */}
              <Route
                path="/"
                element={
                  <div className="w-full">
                    <Home
                      onEnter={handleEnter}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      animations={allAnimations}
                      onNavigate={handleNavChange}
                    />
                  </div>
                }
              />

              {/*All APP ROUTES */}
              <Route
                path="*"
                element={
                  <div className="flex flex-1 w-full">
                    {/* Sidebar Only show if not in creation mode */}
                    {!isCreating && (
                      <aside className="hidden md:block sticky -top-5 self-start h-[calc(100vh-64px)] shrink-0 bg-[#050505] z-10">
                        <Sidebar
                          selectedCategory={selectedCategory}
                          activeNavigation={activeNavigation}
                          onNavigate={handleNavChange}
                          animations={allAnimations}
                        />
                      </aside>
                    )}

                    <section className="flex-1">
                      {isCreating ? (
                        <div className="min-h-screen flex items-center justify-center p-6">
                          {creationStep === 1 ? (
                            <CategorySelectModal
                              onSelect={cat => {
                                setNewCategory(cat);
                                setCreationStep(2);
                              }}
                              onClose={() => {
                                setIsCreating(false);
                                clearCreationStorage();
                              }}
                            />
                          ) : (
                            <CreatorModal
                              category={newCategory}
                              onClose={() => {
                                setIsCreating(false);
                                clearCreationStorage();
                              }}
                              onSave={anim => {
                                setIsNavigating(true);
                                clearCreationStorage(); // for remove localStorage
                                setTimeout(() => {
                                  setAllAnimations(prev => [anim, ...prev]);
                                  setIsCreating(false);
                                  navigate('/community');
                                  setIsNavigating(false);
                                }, 100);
                              }}
                              handleStartCreating={handleStartCreating}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="py-4 md:py-0">
                          <Routes>
                            <Route
                              path="/animations"
                              element={
                                <GridContent
                                  animations={allAnimations}
                                  searchQuery={searchQuery}
                                  setSearchQuery={setSearchQuery}
                                  selectedCategory="All"
                                  onCardClick={handleOpenPreview}
                                  previewType={previewType}
                                  setPreviewType={setPreviewType}
                                  onShareClick={setSelectedShare}
                                />
                              }
                            />
                            <Route
                              path="/community"
                              element={
                                <CommunityGrid
                                  animations={allAnimations}
                                  onCardClick={handleOpenPreview}
                                  previewType={previewType}
                                  handleStartCreating={handleStartCreating}
                                  onShareClick={setSelectedShare}
                                  onBack={() => handleNavChange('Home')}
                                />
                              }
                            />
                            <Route
                              path="/about"
                              element={
                                <About
                                  onBack={() => handleNavChange('Home')}
                                  animations={allAnimations}
                                />
                              }
                            />
                            <Route
                              path="/:id"
                              element={
                                <DynamicRouteRenderer
                                  allAnimations={allAnimations}
                                  searchQuery={searchQuery}
                                  setSearchQuery={setSearchQuery}
                                  handleOpenPreview={handleOpenPreview}
                                  previewType={previewType}
                                  setPreviewType={setPreviewType}
                                  setSelectedShare={setSelectedShare}
                                  activeAnimation={activeAnimation}
                                  handleClosePreview={handleClosePreview}
                                />
                              }
                            />
                          </Routes>
                        </div>
                      )}
                    </section>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
