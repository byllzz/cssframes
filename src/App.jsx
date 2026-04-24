import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { categories, categoryList } from './data/animationCategories';


// UI Components & Data
import Sidebar from './components/layout/Sidebar';
import GridContent from './components/ui/GridContent';
import PreviewModal from './components/models/PreviewModal';
import Navbar from './components/layout/Navbar';
import TopLoader from './components/layout/TopLoader';
import Footer from './components/layout/Footer';
import CategorySelectModal from './components/models/CategorySelectModal';
import CreatorModal from './components/models/CreatorModal';
import SharePanel from './components/models/SharePanel';
import About from './components/pages/About';
import CommunityGrid from './components/ui/CommunityGrid';
import { animations as localAnimations } from './data/animations';
import Home from './components/pages/Home';

import { getAnimations, createAnimation } from './api/animations';

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

  //  STATES
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState('Home');
  const [previewType, setPreviewType] = useState(() => {
    return localStorage.getItem('cssframes_preview_type') || 'text';
  });
  const [isNavigating, setIsNavigating] = useState(false);

  const [allAnimations, setAllAnimations] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchData = async () => {
    try {
      const apiData = await getAnimations();

      //  apiData is an array
      const remoteAnims = Array.isArray(apiData) ? apiData : [];
      const sortedRemote = [...remoteAnims].sort((a, b) => b.id - a.id);

      //  first, then Local (Static)
      const merged = [...sortedRemote, ...localAnimations];

      setAllAnimations(merged);
    } catch (err) {
      console.error(err);
      setAllAnimations(localAnimations);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  const [isCreating, setIsCreating] = useState(false);
  const [creationStep, setCreationStep] = useState(1);
  const [newCategory, setNewCategory] = useState('box');
  const [selectedShare, setSelectedShare] = useState(null);

  //NAVIGATION & SIDEBAR LOGIC
  useEffect(() => {
    const path = location.pathname.substring(1);

    // Set Active Navigation Tab
    if (path === 'about') setActiveNavigation('About');
    else if (path === 'community') setActiveNavigation('Community');
    else if (path === '' || path === 'animations') {
        setActiveNavigation('Home');
        if (path === 'animations') setSelectedCategory('All');
    } else {
        setActiveNavigation('Home');
        const matchedCategory = categories.find(cat => cat.name.toLowerCase() === path.toLowerCase());
        if (matchedCategory) setSelectedCategory(matchedCategory.name);
    }

    // Set Active Animation Preview
    if (path && !['about', 'community', 'animations'].includes(path)) {
      const found = allAnimations.find(a => a.id.toLowerCase() === path.toLowerCase());
      if (found) setActiveAnimation(found);
    } else {
      setActiveAnimation(null);
    }
  }, [location.pathname, allAnimations]);


// Document title logic
useEffect(() => {
  const baseName = "CssFrames";
  const pathname = location.pathname.toLowerCase();

  // remove leading slash for matching animation IDs
  const path = pathname.replace("/", "");

  const currentAnim = allAnimations.find(
    (a) => a.id.toLowerCase() === path
  );

  let title = baseName;

  if (currentAnim) {
    title = `${currentAnim.title} made with CSS Keyframes | ${baseName}`;
  }
  else if (pathname === "/community") {
    const communityCount = allAnimations.filter(
      (item) => item.isCommunity
    ).length;

    title = `${communityCount} Community Creations | ${baseName}`;
  }
  else if (pathname === "/about") {
    title = `Our Story | ${baseName}`;
  }
  else if (pathname === "/" || pathname === "/home") {
    title = `${baseName} | Open-source animation library using Pure CSS Keyframes `;
  }
  else {
    const displayCategory =
      selectedCategory.charAt(0).toUpperCase() +
      selectedCategory.slice(1);

    const count =
      selectedCategory === "All"
        ? allAnimations.length
        : allAnimations.filter(
            (a) =>
              a.category?.toLowerCase() ===
              selectedCategory.toLowerCase()
          ).length;

    title =
      selectedCategory === "All"
        ? `${count} CSS Animations | ${baseName} open-source animations library using CSS Keyframes`
        : `${count} ${displayCategory} Animations | ${baseName}`;
  }

  document.title = title;
}, [location.pathname, selectedCategory, allAnimations]);

  // ALl Handlers
  const handleNavChange = (targetPath, category = null) => {
    setIsNavigating(true);
    setTimeout(() => {
      if (targetPath === 'Animations') {
        navigate('/animations');
        setSelectedCategory('All');
        setActiveNavigation('Home');
      } else if (targetPath === 'Home') {
        const urlSlug = category?.toLowerCase() === 'all' ? 'animations' : category?.toLowerCase() || '';
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

      navigate(`/${animation.id.toLowerCase().trim()}`, {
        state: { from: location.pathname }, // this store where user came from
      });
    }, 400);

    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleClosePreview = () => {
    setIsNavigating(true);

    setTimeout(() => {
      const from = location.state?.from || '/animations'; // fallback

      setActiveAnimation(null);
      navigate(from); //  go back to actual previous route
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

  const handleEnter = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/animations');
      setIsNavigating(false);
    }, 400);
  };

  // Local Storage logic
  //Single effect to save ONLY community items (this prevents duplication)
  // useEffect(() => {
  //   try {
  //     const communityOnly = allAnimations.filter(a => a.isCommunity);
  //     localStorage.setItem('cssframes_animations', JSON.stringify(communityOnly));
  //   } catch (e) {
  //     console.error('Failed to save animations:', e);
  //   }
  // }, [allAnimations]);

  // Load Creation state
  useEffect(() => {
    const savedIsCreating = localStorage.getItem('cssframes_is_creating');
    if (savedIsCreating === 'true') {
      setIsCreating(true);
      setCreationStep(Number(localStorage.getItem('cssframes_creation_step') || 1));
      setNewCategory(localStorage.getItem('cssframes_new_category') || 'box');
    }
  }, []);

  // Save Creation/Preview state
  useEffect(() => {
    localStorage.setItem('cssframes_is_creating', String(isCreating));
    localStorage.setItem('cssframes_creation_step', String(creationStep));
    localStorage.setItem('cssframes_new_category', newCategory);
    localStorage.setItem('cssframes_preview_type', previewType);
  }, [isCreating, creationStep, newCategory, previewType]);

  const clearCreationStorage = () => {
    ['cssframes_is_creating', 'cssframes_creation_step', 'cssframes_new_category', 'cssframes_creator_draft'].forEach(key => localStorage.removeItem(key));
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

                              onSave={async anim => {
  setIsNavigating(true);
  clearCreationStorage();

  try {
    const saved = await createAnimation({
      ...anim,
      isCommunity: true,
      createdAt: Date.now()
    });
    setAllAnimations(prev => [saved, ...prev]);

    setIsCreating(false);
    navigate('/community');
  } catch (err) {
    console.error('Failed to save animation:', err);
  } finally {
    setIsNavigating(false);
  }
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
                                  onNavigate={handleNavChange}
                                />
                              }
                            />
                            <Route
                              path="/about"
                              element={
                                <About onNavigate={handleNavChange} animations={allAnimations} />
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
