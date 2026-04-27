import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
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
import Home from './components/pages/Home';

import { getAnimations, createAnimation } from './api/animations';

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
    <div className="absolute size-64 bg-purple-500/5 blur-[120px] pointer-events-none" />
    <div className="relative space-y-8 flex flex-col items-center">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-medium">Error 404</p>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
          Animation not found
        </h2>
        <p className="text-zinc-500 max-w-[280px] text-sm leading-relaxed mx-auto">
          The piece you're looking for might have been moved or doesn't exist yet.
        </p>
      </div>
      <button
        onClick={onBack}
        className="group relative px-8 py-3 bg-white text-black rounded-full font-medium text-sm transition-all duration-300 hover:bg-zinc-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        <span className="flex items-center gap-2">
          Back to Library
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </div>
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

  //  Fetch Animations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getAnimations();
        const remoteAnims = Array.isArray(apiData) ? apiData : [];
        const sortedRemote = [...remoteAnims].sort((a, b) => b.id - a.id);
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

  //  Sync URL → isCreating state on refresh
  //  If someone lands on /create directly, activate creator mode
  useEffect(() => {
    if (location.pathname === '/create' || location.pathname === '/create/details') {
      setIsCreating(true);
    }
  }, []); // only on mount

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

  const handleEnter = () => {
    withTransition(() => navigate('/animations'));
  };

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

  //  Creator UI (rendered outside Routes so URL /create works cleanly)
  const isOnCreateRoute =
    location.pathname === '/create' || location.pathname.startsWith('/create');

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
              {/* Home */}
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
                          onSave={async anim => {
                            // CreatorModal stays mounted until save is done
                            setIsNavigating(true);

                            try {
                              const saved = await createAnimation(anim);
                              //Save succeeded - now safe to close creator and update state
                              setAllAnimations(prev => [saved, ...prev]);
                              clearCreationStorage();
                              setIsCreating(false);
                              navigate('/community');
                            } catch (err) {
                              console.error('Failed to save animation:', err);
                              //Save failed — add locally so work isn't lost, still navigate
                              setAllAnimations(prev => [{ ...anim, id: anim.id || `community-${Date.now()}` }, ...prev]);
                              clearCreationStorage();
                              setIsCreating(false);
                              navigate('/community');
                            } finally {
                              setIsNavigating(false);
                            }
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
