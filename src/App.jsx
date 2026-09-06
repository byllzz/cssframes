import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { categories, categoryList } from './data/animationCategories';
import { ArrowRight } from 'lucide-react';

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
// Landing page disabled for now - see the commented-out "/" route below.
// import Home from './components/pages/Home';

import { getStoredCommunityAnimations, saveCommunityAnimation } from './utils/communityAnimations';

// Loading Spinner
const LoadingSpinner = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center gap-7">
    <style>{`
      @keyframes orbit {
        from { transform: rotate(0deg) translateX(28px) rotate(0deg); }
        to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
      }
      @keyframes orbit2 {
        from { transform: rotate(120deg) translateX(28px) rotate(-120deg); }
        to   { transform: rotate(480deg) translateX(28px) rotate(-480deg); }
      }
      @keyframes orbit3 {
        from { transform: rotate(240deg) translateX(28px) rotate(-240deg); }
        to   { transform: rotate(600deg) translateX(28px) rotate(-600deg); }
      }
      @keyframes coreBreath {
        0%,100% { transform: scale(1); opacity: 1; }
        50%     { transform: scale(1.18); opacity: 0.65; }
      }
      @keyframes dash {
        0%   { stroke-dashoffset: 220; }
        60%  { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -220; }
      }
      @keyframes textBlink {
        0%,100% { opacity: 0.35; letter-spacing: 0.22em; }
        50%     { opacity: 0.65; letter-spacing: 0.28em; }
      }
      .cf-orbit-dot {
        width: 7px; height: 7px; border-radius: 50%;
        position: absolute; top: 50%; left: 50%;
        margin: -3.5px 0 0 -3.5px;
      }
    `}</style>

    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* Sweeping arc */}
      <svg width="80" height="80" className="absolute inset-0">
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="1"
          strokeDasharray="220"
          strokeDashoffset="220"
          strokeLinecap="round"
          style={{ animation: 'dash 2s ease-in-out infinite', transformOrigin: '40px 40px' }}
        />
      </svg>

      {/* Pulsing core */}
      <div
        className="absolute w-4 h-4 rounded-full bg-violet-600"
        style={{ animation: 'coreBreath 2.4s ease-in-out infinite' }}
      />

      {/* Orbiting dots */}
      <div
        className="cf-orbit-dot bg-violet-400"
        style={{ animation: 'orbit  2.4s linear infinite' }}
      />
      <div
        className="cf-orbit-dot bg-indigo-400"
        style={{ animation: 'orbit2 2.4s linear infinite' }}
      />
      <div
        className="cf-orbit-dot bg-purple-300"
        style={{ animation: 'orbit3 2.4s linear infinite' }}
      />
    </div>

    <p
      className="text-[11px] text-zinc-500 uppercase"
      style={{ animation: 'textBlink 2.4s ease-in-out infinite' }}
    >
      Loading Animation Cards
    </p>
  </div>
);

//  404 UI
const NotFound = ({ onBack }) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
    <span className="text-[13px] font-mono text-white/30 mb-4">404</span>
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
      Animation not found
    </h2>
    <p className="text-white/40 max-w-[300px] text-sm leading-relaxed mb-8">
      The animation you're looking for might have been moved or doesn't exist.
    </p>
    <button
      onClick={onBack}
      className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-[10px] font-medium text-sm transition-colors hover:bg-white/90 active:scale-95"
    >
      Back to library
      <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
    </button>
  </div>
);


//  /:category Route
const CategoryRoute = ({
  allAnimations,
  loading,
  searchQuery,
  setSearchQuery,
  handleOpenPreview,
  previewType,
  setPreviewType,
  setSelectedShare,
  onBack,
}) => {
  const { category } = useParams();
  const lowerCat = category?.toLowerCase();

  if (loading) return <LoadingSpinner />;

  if (!categoryList.includes(lowerCat)) {
    const anim = allAnimations.find(a => a.id.toLowerCase() === lowerCat);
    if (anim) {
      return (
        <div className="p-4 md:pl-2 md:pr-3 md:py-9">
          <PreviewModal animation={anim} onClose={onBack} previewType={previewType} />
        </div>
      );
    }
    return <NotFound onBack={onBack} />;
  }

  const formattedCategory =
    lowerCat === 'animations' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);

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
};

// /:category/:id Route
const AnimationRoute = ({
  allAnimations,
  loading,
  previewType,
  handleClosePreview,
  activeAnimation,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  const lowerId = id?.toLowerCase();
  const anim = activeAnimation || allAnimations.find(a => a.id.toLowerCase() === lowerId);

  if (!anim) return <NotFound onBack={() => navigate('/animations')} />;

  return (
    <div className="p-4 md:pl-2 md:pr-3 md:py-9">
      <PreviewModal animation={anim} onClose={handleClosePreview} previewType={previewType} />
    </div>
  );
};

//  App
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState('Home');
  const [previewType, setPreviewType] = useState(
    () => localStorage.getItem('cssframes_preview_type') || 'text'
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const [allAnimations, setAllAnimations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCreating, setIsCreating] = useState(false);
  const [creationStep, setCreationStep] = useState(1);
  const [newCategory, setNewCategory] = useState('box');
  const [selectedShare, setSelectedShare] = useState(null);

  //  Load community animations from localStorage - no backend, works
  //  fully offline, and every visitor's "create" actually persists for
  //  them across reloads instead of silently vanishing.
  useEffect(() => {
    try {
      const stored = getStoredCommunityAnimations();
      setAllAnimations([...stored, ...localAnimations]);
    } catch (err) {
      console.error('Failed to load community animations:', err);
      setAllAnimations(localAnimations);
    } finally {
      setLoading(false);
    }
  }, []);

  //  Sync URL → isCreating state on refresh
  //  If someone lands on /create directly, activate creator mode.
  //  Intentionally mount-only: this handles a direct page load/refresh,
  //  not ongoing navigation (a separate effect below handles that).
  useEffect(() => {
    if (location.pathname === '/create' || location.pathname === '/create/details') {
      setIsCreating(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Sync sidebar + activeAnimation from URL
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const [seg1, seg2] = parts;

    // Don't interfere with creator route
    if (seg1 === 'create') return;

    if (!seg1) {
      setActiveNavigation('Home');
      setActiveAnimation(null);
      return;
    }

    const lower1 = seg1.toLowerCase();

    if (lower1 === 'about') {
      setActiveNavigation('About');
      setActiveAnimation(null);
    } else if (lower1 === 'community') {
      setActiveNavigation('Community');
      setActiveAnimation(null);
    } else if (lower1 === 'animations') {
      setActiveNavigation('Home');
      setSelectedCategory('All');
      setActiveAnimation(null);
    } else if (categoryList.includes(lower1)) {
      setActiveNavigation('Home');
      setSelectedCategory(seg1.charAt(0).toUpperCase() + seg1.slice(1));
      if (seg2 && allAnimations.length > 0) {
        const found = allAnimations.find(a => a.id.toLowerCase() === seg2.toLowerCase());
        if (found) setActiveAnimation(found);
      } else if (!seg2) {
        setActiveAnimation(null);
      }
    } else {
      setActiveNavigation('Home');
      if (allAnimations.length > 0) {
        const found = allAnimations.find(a => a.id.toLowerCase() === lower1);
        if (found) {
          setActiveAnimation(found);
          setSelectedCategory(found.category || 'All');
        }
      }
    }
  }, [location.pathname, allAnimations]);

  //  Document Title
  useEffect(() => {
    const baseName = 'CssFrames';
    const parts = location.pathname.split('/').filter(Boolean);
    const [seg1, seg2] = parts;

    if (seg1 === 'create') {
      document.title = `Create Animation | ${baseName}`;
      return;
    }

    const animId = seg2 || seg1;
    const currentAnim =
      animId && allAnimations.find(a => a.id.toLowerCase() === animId.toLowerCase());

    let title = baseName;
    if (currentAnim) {
      title = `${currentAnim.title} made with CSS Keyframes | ${baseName}`;
    } else if (seg1 === 'community') {
      const count = allAnimations.filter(i => i.isCommunity).length;
      title = `${count} Community Creations | ${baseName}`;
    } else if (seg1 === 'about') {
      title = `Our Story | ${baseName}`;
    } else if (!seg1) {
      title = `${baseName} | Open-source animation library using Pure CSS Keyframes`;
    } else {
      const displayCategory =
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      const count =
        selectedCategory === 'All'
          ? allAnimations.length
          : allAnimations.filter(
              a => a.category?.toLowerCase() === selectedCategory.toLowerCase()
            ).length;
      title =
        selectedCategory === 'All'
          ? `${count} CSS Animations | ${baseName} open-source animations library using CSS Keyframes`
          : `${count} ${displayCategory} Animations | ${baseName}`;
    }

    document.title = title;
  }, [location.pathname, selectedCategory, allAnimations]);

  //  Helpers
  const withTransition = (fn, delay = 400) => {
    setIsNavigating(true);
    setTimeout(() => {
      fn();
      setIsNavigating(false);
    }, delay);
  };

  //  Handlers
  const handleNavChange = (targetPath, category = null) => {
    withTransition(() => {
      if (targetPath === 'Animations') {
        navigate('/animations');
        setSelectedCategory('All');
        setActiveNavigation('Home');
      } else if (targetPath === 'Home') {
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
    }, 600);
  };

  const handleOpenPreview = animation => {
    withTransition(() => {
      setActiveAnimation(animation);
      const cat = animation.category?.toLowerCase() || 'animations';
      const id = animation.id.toLowerCase().trim();
      navigate(`/${cat}/${id}`, { state: { from: location.pathname } });
    });
  };

  const handleClosePreview = () => {
    withTransition(() => {
      const from = location.state?.from || '/animations';
      setActiveAnimation(null);
      navigate(from);
    });
  };

  //   navigate to /create so URL reflects creator mode
  const handleStartCreating = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsCreating(true);
      setCreationStep(1);
      navigate('/create');         // URL shows /create
      setIsNavigating(false);
    }, 600);
  };

  // Only used by the landing page's "Enter" button, which is currently
  // disabled (see the commented-out "/" route above).
  // const handleEnter = () => {
  //   withTransition(() => navigate('/animations'));
  // };

  const clearCreationStorage = () => {
    [
      'cssframes_is_creating',
      'cssframes_creation_step',
      'cssframes_new_category',
      'cssframes_creator_draft',
    ].forEach(key => localStorage.removeItem(key));
  };

  //  localStorage
  useEffect(() => {
    const savedIsCreating = localStorage.getItem('cssframes_is_creating');
    if (savedIsCreating === 'true') {
      setIsCreating(true);
      setCreationStep(Number(localStorage.getItem('cssframes_creation_step') || 1));
      setNewCategory(localStorage.getItem('cssframes_new_category') || 'box');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cssframes_is_creating', String(isCreating));
    localStorage.setItem('cssframes_creation_step', String(creationStep));
    localStorage.setItem('cssframes_new_category', newCategory);
    localStorage.setItem('cssframes_preview_type', previewType);
  }, [isCreating, creationStep, newCategory, previewType]);

  const sharedRouteProps = {
    allAnimations,
    loading,
    searchQuery,
    setSearchQuery,
    handleOpenPreview,
    previewType,
    setPreviewType,
    setSelectedShare,
    activeAnimation,
    handleClosePreview,
  };

  return (
    <>
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
          <nav>
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
              {/* Landing page temporarily disabled - root now redirects
                  straight into the app. To bring the landing page back,
                  uncomment this Route and remove the redirect below it. */}
              {/*
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
              */}
              <Route path="/" element={<Navigate to="/animations" replace />} />

              {/*  /create ROUTE * */}
              <Route
                path="/create"
                element={
                  <div className="flex flex-1 w-full">
                    <section className="flex-1">
                      <div className="min-h-screen flex items-center justify-center p-6">
                        {creationStep === 1 ? (
                          <CategorySelectModal
                            onSelect={cat => {
                              setNewCategory(cat);
                              setCreationStep(2);
                              navigate('/create/details'); //  gets its own URL too
                            }}
                            onClose={() => {
                              setIsCreating(false);
                              clearCreationStorage();
                              navigate(-1); // go back
                            }}
                          />
                        ) : (
                          //  redirects to /create/details, handled below
                          <CategorySelectModal
                            onSelect={cat => {
                              setNewCategory(cat);
                              setCreationStep(2);
                              navigate('/create/details');
                            }}
                            onClose={() => {
                              setIsCreating(false);
                              clearCreationStorage();
                              navigate(-1);
                            }}
                          />
                        )}
                      </div>
                    </section>
                  </div>
                }
              />

              {/*/create/details - CSS editor step */}
              <Route
                path="/create/details"
                element={
                  <div className="flex flex-1 w-full">
                    <section className="flex-1">
                      <div className="min-h-screen flex items-center justify-center p-6">
                        <CreatorModal
                          category={newCategory}
                          onClose={() => {
                            setIsCreating(false);
                            clearCreationStorage();
                            navigate('/animations');
                          }}
                          onSave={anim => {
                            // Persist to localStorage - this always
                            // succeeds locally, so no try/catch needed
                            // for a network call that no longer exists.
                            setIsNavigating(true);
                            const saved = saveCommunityAnimation(anim);
                            setAllAnimations(prev => [saved, ...prev]);
                            clearCreationStorage();
                            setIsCreating(false);
                            navigate('/community');
                            setIsNavigating(false);
                          }}
                          handleStartCreating={() => {
                            // "Change Category" goes back to step 1
                            setCreationStep(1);
                            navigate('/create');
                          }}
                        />
                      </div>
                    </section>
                  </div>
                }
              />

              {/*  ALl other routes */}
              <Route
                path="*"
                element={
                  <div className="flex flex-1 w-full">
                    <aside className="hidden md:block sticky -top-5 self-start h-[calc(100vh-64px)] shrink-0 bg-[#050505] z-10">
                      <Sidebar
                        selectedCategory={selectedCategory}
                        activeNavigation={activeNavigation}
                        onNavigate={handleNavChange}
                        animations={allAnimations}
              handleStartCreating={handleStartCreating}
                      />
                    </aside>

                    <section className="flex-1">
                      <div className="py-4 md:py-0">
                        <Routes>
                          <Route
                            path="/animations"
                            element={
                              loading ? (
                                <LoadingSpinner />
                              ) : (
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
                              )
                            }
                          />

                          <Route
                            path="/community"
                            element={
                              loading ? (
                                <LoadingSpinner />
                              ) : (
                                <CommunityGrid
                                  animations={allAnimations}
                                  onCardClick={handleOpenPreview}
                                  previewType={previewType}
                                  handleStartCreating={handleStartCreating}
                                  onShareClick={setSelectedShare}
                                  onNavigate={handleNavChange}
                                />
                              )
                            }
                          />

                          <Route
                            path="/about"
                            element={
                              <About onNavigate={handleNavChange} animations={allAnimations} />
                            }
                          />

                          <Route
                            path="/:category/:id"
                            element={
                              <AnimationRoute
                                allAnimations={allAnimations}
                                loading={loading}
                                previewType={previewType}
                                handleClosePreview={handleClosePreview}
                                activeAnimation={activeAnimation}
                              />
                            }
                          />

                          <Route
                            path="/:category"
                            element={
                              <CategoryRoute
                                {...sharedRouteProps}
                                onBack={() => navigate('/animations')}
                              />
                            }
                          />
                        </Routes>
                      </div>
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
