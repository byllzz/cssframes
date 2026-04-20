import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import {
  LayoutGrid,
  MousePointer2,
  Loader2,
  LogIn,
  Type,
  CreditCard,
  Shapes,
  Zap,
  Monitor,
  Box,
  Sparkles,
} from 'lucide-react';

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

// GLOBAL DATA
const categories = [
  { name: 'All', icon: <LayoutGrid size={18} strokeWidth={2.5} /> },
  { name: 'Buttons', icon: <MousePointer2 size={18} strokeWidth={2.5} /> },
  { name: 'Loaders', icon: <Loader2 size={18} strokeWidth={2.5} className="animate-spin" /> },
  { name: 'Arrival', icon: <LogIn size={18} strokeWidth={2.5} /> },
  { name: 'Transitions', icon: <Zap size={18} strokeWidth={2.5} /> },
  { name: 'Cards', icon: <CreditCard size={18} strokeWidth={2.5} /> },
  { name: 'Text', icon: <Type size={18} strokeWidth={2.5} /> },
  { name: 'Icons', icon: <Sparkles size={18} strokeWidth={2.5} /> },
  { name: 'Scroll', icon: <Monitor size={18} strokeWidth={2.5} /> },
];

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

  const categoryList = [
    'animations',
    'buttons',
    'loaders',
    'arrivals',
    'transitions',
    'cards',
    'text',
    'icons',
    'scroll',
  ];

  const lowerId = id.toLowerCase();

  // Category Logic
  if (categoryList.includes(lowerId)) {
    const formattedCategory =
      lowerId === 'animations' ? 'All' : id.charAt(0).toUpperCase() + id.slice(1);

    // const formattedCategory = categories.find(c => c.name.toLowerCase() === lowerId)?.name;

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

  // const currentAnim = allAnimations.find(a => a.id.toLowerCase() === id.toLowerCase());

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
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-xl font-semibold text-white mb-2">Animation not found</h2>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-white text-black rounded-full font-medium"
      >
        Back to Library
      </button>
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
  const [showDevPopup, setShowDevPopup] = useState(false);

  // all useEffects
  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path === 'about') setActiveNavigation('About');
    else if (path === 'community') setActiveNavigation('Community');
    else if (path === '') setActiveNavigation('Home');

    if (path && !['about', 'community'].includes(path)) {
      const found = allAnimations.find(a => a.id === path);
      // const normalize = str => str.toLowerCase();
      // const found = allAnimations.find(a => normalize(a.id) === normalize(id));
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
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleOpenPreview = animation => {
    setIsNavigating(true);
    setTimeout(() => {
      setActiveAnimation(animation);
      // navigate(`/${animation.id}`);
      navigate(`/${animation.id.toLowerCase().trim()}`);
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleClosePreview = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setActiveAnimation(null);
      navigate('/');
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

  return (
    <>
      <TopLoader isLoading={isNavigating} />
      {showDevPopup && <DevelopmentPopup onClose={() => setShowDevPopup(false)} />}
      <SharePanel
        animation={selectedShare}
        isOpen={!!selectedShare}
        onClose={() => setSelectedShare(null)}
      />

      <div className="h-screen w-full bg-[#050505] text-zinc-200">
        <div
          className={`h-screen overflow-y-auto scroll-smooth ${showDevPopup ? 'overflow-hidden' : ''}`}
        >
          <Navbar
            activeNavigation={activeNavigation}
            onNavigate={handleNavChange}
            handleStartCreating={handleStartCreating}
            isNavigating={isNavigating}
            animations={allAnimations}
            categories={categories}
          />

          <div className="flex flex-col md:flex-row w-full">
            {!isCreating && (
              <aside className="hidden md:block sticky top-0 self-start h-screen shrink-0 bg-[#050505] z-10">
                <Sidebar
                  selectedCategory={selectedCategory}
                  activeNavigation={activeNavigation}
                  onNavigate={handleNavChange}
                  animations={allAnimations}
                />
              </aside>
            )}

            <main className="flex-1">
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
                        // onSave={anim => setAllAnimations([anim, ...allAnimations])}
                        onSave={anim => {
                          setIsNavigating(true);

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
                  <Routes>
                    <Route
                      path="/"
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
                        <About onBack={() => handleNavChange('Home')} animations={allAnimations} />
                      }
                    />

                    {/* 3. UPDATED ROUTE PASSING ALL PROPS */}
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
