 import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation  , useParams , Navigate} from 'react-router-dom';
import { Users,
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
  Sparkles,} from 'lucide-react'
// UI Components
import Sidebar from './components/ui/Sidebar';
import GridContent from './components/ui/GridContent';
import PreviewModal from './components/ui/PreviewModal';
import Navbar from './components/ui/Navbar';
import TopLoader from './components/ui/TopLoader';
import Footer from './components/layout/Footer';

// Modals & Panels
import CategorySelectModal from './components/models/CategorySelectModal';
import CreatorModal from './components/models/CreatorModal';
import SharePanel from './components/models/SharePanel';
import DevelopmentPopup from './components/alerts/DevelopmentPopup';

// Tabs
import About from './components/tabs/About';
import CommunityGrid from './components/ui/CommunityGrid';

// Data
import { animations as initialAnimations } from './data/animations';

// import Elements from './components/ui/Elements';

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

  // // URL sync logic &  "Deep Linking"
  useEffect(() => {
    const path = location.pathname.substring(1); // Remove the "/"

    // Checking if path is a main page
    if (path === 'about') setActiveNavigation('About');
    else if (path === 'community') setActiveNavigation('Community');
    else if (path === '') setActiveNavigation('Home');

    //  Checking if path is an animation ID
    if (path && !['about', 'community'].includes(path)) {
      const found = allAnimations.find(a => a.id === path);
      if (found) {
        setActiveAnimation(found);
      }
    } else {
      setActiveAnimation(null);
    }
  }, [location.pathname, allAnimations]);

  // main logic for app
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('cssframes_dev_alert_seen');
    if (!hasSeenPopup) setShowDevPopup(true);
  }, []);

  const closeDevPopup = () => {
    localStorage.setItem('cssframes_dev_alert_seen', 'true');
    setShowDevPopup(false);
  };

  const addNewAnimation = newAnim => {
    const animationWithId = {
      ...newAnim,
      isCommunity: true,
      author: 'Local User',
      duration: newAnim.duration || '2s',
    };
    setAllAnimations(prev => [animationWithId, ...prev]);
    setIsCreating(false);
    handleNavChange('Community');
  };

const handleNavChange = (targetPath, category = null) => {
  setIsNavigating(true);

  setTimeout(() => {
    if (targetPath === 'Home') {
      if (category) {
        // If user clicks "All", use "animations" in the URL. Otherwise we have to use the category name.
        const urlSlug = category.toLowerCase() === 'all' ? 'animations' : category.toLowerCase();
        navigate(`/${urlSlug}`);
      } else {
        navigate('/');
      }
      setSelectedCategory(category || 'All');
      setActiveNavigation('Home');
    } else {
      const urlMap = { 'About': '/about', 'Community': '/community' };
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
      setIsCreating(false);
      navigate(`/${animation.id}`); // Updates URL to animation name
    }, 400);
    setTimeout(() => setIsNavigating(false), 800);
  };

  const handleClosePreview = () => {
    setIsNavigating(true); // Start the loader

    setTimeout(() => {
      setActiveAnimation(null);
      navigate('/'); // Change the URL
    }, 400); // Wait for loader to reach middle

    setTimeout(() => setIsNavigating(false), 800); // Finish loader
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

  // for loader
  useEffect(() => {
    setIsNavigating(true);

    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]); // This runs every time the URL changes

  useEffect(() => {
    const baseTitle = 'CSS Frames';
    let newTitle = baseTitle;

    if (activeAnimation) {
      const animName = activeAnimation?.name || activeAnimation?.title || 'Animation';
      newTitle = `${animName} Animation | ${baseTitle}`;
    } else if (activeNavigation === 'Community') {
      newTitle = `Community Animations | ${baseTitle}`;
    } else if (activeNavigation === 'About') {
      newTitle = `About | ${baseTitle}`;
    } else if (selectedCategory && selectedCategory !== 'All') {
      newTitle = `${selectedCategory} Animations | ${baseTitle}`;
    } else {
      newTitle = `${baseTitle} | High-Quality CSS Animations`;
    }

    document.title = newTitle;
  }, [activeNavigation, selectedCategory, activeAnimation]);

  // this should be latter global array for cats
  const categories = [
    { name: 'All', icon: <LayoutGrid size={18} strokeWidth={2.5} /> },
    { name: 'Buttons', icon: <MousePointer2 size={18} strokeWidth={2.5} /> },
    {
      name: 'Loaders',
      icon: <Loader2 size={18} strokeWidth={2.5} className="animate-spin" />,
    },
    { name: 'Arrival', icon: <LogIn size={18} strokeWidth={2.5} /> },
    { name: 'Transitions', icon: <Zap size={18} strokeWidth={2.5} /> },
    { name: 'Cards', icon: <CreditCard size={18} strokeWidth={2.5} /> },
    { name: 'Text', icon: <Type size={18} strokeWidth={2.5} /> },
    { name: 'Icons', icon: <Sparkles size={18} strokeWidth={2.5} /> },
    { name: 'Shapes', icon: <Shapes size={18} strokeWidth={2.5} /> },
    { name: 'Scroll', icon: <Monitor size={18} strokeWidth={2.5} /> },
    { name: 'Components', icon: <Box size={18} strokeWidth={2.5} /> },
  ];

   const DynamicRouteRenderer = () => {
     const { id } = useParams();
     const navigate = useNavigate();

     // Handle "All" or empty ID redirect to home
     if (!id) {
       return <Navigate to="/" replace />;
     }

     // List of your Sidebar categories (lowercase)
     const categoryList = [
       'animations',
       'buttons',
       'loaders',
       'arrival',
       'transitions',
       'cards',
       'text',
       'icons',
       'shapes',
       'scroll',
       'components',
     ];

     const lowerId = id.toLowerCase();

     // Check if URL is a Category: /cards, /buttons, etc.
     if (categoryList.includes(lowerId)) {
       // Convert 'buttons' back to 'Buttons' for filtering logic
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

     //  Handle Animation Previews like: /elastic-pop, /fade-in
     // We have to check if activeAnimation matches the URL, or try to find it in allAnimations
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

     // Fallback: a nice "Not Found" message with a reset button
     return (
       <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
         <h2 className="text-xl font-semibold text-white mb-2">Animation not found</h2>
         <p className="text-zinc-500 mb-6">
           The animation you're looking for doesn't exist or has been moved.
         </p>
         <button
           onClick={() => navigate('/')}
           className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors"
         >
           Back to Library
         </button>
       </div>
     );
   };

  return (
    <>
      <TopLoader isLoading={isNavigating} />

      {showDevPopup && <DevelopmentPopup onClose={closeDevPopup} />}

      <SharePanel
        animation={selectedShare}
        isOpen={!!selectedShare}
        onClose={() => setSelectedShare(null)}
      />

      <div className="h-screen w-full bg-[#050505] text-zinc-200 selection:bg-white selection:text-black">
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

            <main
              className={`flex-1 animate-in fade-in slide-in-from-bottom-2 duration-700 scrollbar-hide ${isCreating ? 'w-full' : ''}`}
            >
              <div className="py-4 md:py-0">
                {/* creator state */}
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
                ) : (
                  /* Routing for main content */
                  <Routes>
                    {/* Home Route (All animations) */}
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
                          onShareClick={anim => setSelectedShare(anim)}
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
                          onShareClick={anim => setSelectedShare(anim)}
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

                    {/* Checks if ID is a Category OR an Animation */}
                    <Route path="/:id" element={<DynamicRouteRenderer />} />
                  </Routes>
                )}
              </div>
            </main>
          </div>
          <Footer />
          {/* <Elements /> */}
        </div>
      </div>
    </>
  );
}
