import { ArrowLeft, GiftIcon, Rocket } from "lucide-react";
import { FaArrowRightLong, FaGift  , FaUsers} from "react-icons/fa6";
import { MdCommute, MdOutlineAnimation } from 'react-icons/md';
import { animations  } from '../../data/animations';
const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
  .font-mono-jb { font-family: 'JetBrains Mono', monospace; }

  @keyframes orb-float {
    0%,100% { transform: translateY(0) scale(1); }
    50%     { transform: translateY(-32px) scale(1.06); }
  }
  @keyframes logo-spin {
    0%,25%  { transform: rotate(0deg); }
    50%,75% { transform: rotate(180deg); }
    100%    { transform: rotate(360deg); }
  }
  @keyframes pulse-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50%     { opacity:.35; transform:scale(.65); }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes ticker-scroll {
    from { transform:translateX(0); }
    to   { transform:translateX(-50%); }
  }
  @keyframes ticker-scroll-reverse {
    from { transform:translateX(-50%); }
    to   { transform:translateX(0); }
  }
  @keyframes demo-bounce {
    0%,100% { transform:translateY(0);    animation-timing-function:cubic-bezier(.215,.61,.355,1); }
    40%     { transform:translateY(-22px); animation-timing-function:cubic-bezier(.755,.05,.855,.06); }
    70%     { transform:translateY(-10px); animation-timing-function:cubic-bezier(.755,.05,.855,.06); }
  }
  @keyframes demo-fade-seq {
    0%,100% { opacity:.15; transform:scale(.75); }
    50%     { opacity:1;   transform:scale(1); }
  }
  @keyframes demo-spin { to { transform:rotate(360deg); } }
  @keyframes demo-slide {
    from { transform:translateX(-18px); }
    to   { transform:translateX(18px); }
  }
  @keyframes demo-pulse-core {
    0%,100% { transform:scale(1); }
    50%     { transform:scale(1.18); }
  }
  @keyframes demo-pulse-ring {
    0%   { transform:scale(1);   opacity:.7; }
    100% { transform:scale(2.1); opacity:0; }
  }
  @keyframes demo-shake {
    0%,100% { transform:translateX(0)    rotate(0); }
    20%     { transform:translateX(-7px) rotate(-4deg); }
    40%     { transform:translateX(7px)  rotate(4deg); }
    60%     { transform:translateX(-4px) rotate(-2deg); }
    80%     { transform:translateX(4px)  rotate(2deg); }
  }

  .anim-orb-float  { animation: orb-float 8s ease-in-out infinite; }
  .anim-logo-spin  { animation: logo-spin 4s linear infinite; }
  .anim-pulse-dot  { animation: pulse-dot 1.5s ease infinite; }
  .anim-fade-up-0  { animation: fade-up .6s ease both; }
  .anim-fade-up-1  { animation: fade-up .6s .1s ease both; }
  .anim-fade-up-2  { animation: fade-up .6s .2s ease both; }
  .anim-fade-up-3  { animation: fade-up .6s .3s ease both; }
  .anim-fade-up-4  { animation: fade-up .6s .4s ease both; }

  .anim-ticker-1 { animation: ticker-scroll 35s linear infinite; }
  .anim-ticker-2 { animation: ticker-scroll-reverse 28s linear infinite; }
  .anim-ticker-3 { animation: ticker-scroll 22s linear infinite; }
  .anim-ticker-1:hover,
  .anim-ticker-2:hover,
  .anim-ticker-3:hover { animation-play-state: paused; }

  .anim-demo-bounce { animation: demo-bounce 1.2s ease-in-out infinite; }
  .anim-demo-fade-1 { animation: demo-fade-seq 1.6s ease infinite; }
  .anim-demo-fade-2 { animation: demo-fade-seq 1.6s .2s ease infinite; }
  .anim-demo-fade-3 { animation: demo-fade-seq 1.6s .4s ease infinite; }
  .anim-demo-fade-4 { animation: demo-fade-seq 1.6s .6s ease infinite; }
  .anim-demo-spin   { animation: demo-spin 1s linear infinite; }
  .anim-demo-slide  { animation: demo-slide 1.4s ease-in-out infinite alternate; }
  .anim-pulse-core  { animation: demo-pulse-core 1.2s ease-out infinite; }
  .anim-pulse-ring  { animation: demo-pulse-ring 1.2s ease-out infinite; }
  .anim-demo-shake  { animation: demo-shake .6s ease-in-out infinite; }

  .cat-card-glow::before {
    content:''; position:absolute; inset:0; border-radius:14px;
    opacity:0; transition:opacity .3s; background:var(--glow);
  }
  .cat-card-glow:hover::before { opacity:1; }
  .cat-card-glow .accent-line { opacity:0; transition:opacity .3s; }
  .cat-card-glow:hover .accent-line { opacity:1; }

  .gradient-text {
    background: linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#fb923c 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
  }

  .syn-kw   { color:#c084fc; }
  .syn-str  { color:#86efac; }
  .syn-prop { color:#fca5a5; }
  .syn-cm   { color:#3d3a52; }

  .search-box:focus-within {
    border-color:rgba(167,139,250,.45) !important;
    box-shadow:0 0 0 3px rgba(167,139,250,.12);
  }
`;

/* main data */
const CHIPS = [
  { label:"kf-bounce",   color:"#a78bfa" },
  { label:"kf-fade-in",  color:"#f472b6" },
  { label:"kf-slide-up", color:"#34d399" },
  { label:"kf-rotate",   color:"#fb923c" },
  { label:"kf-shake",    color:"#67e8f9" },
  { label:"kf-pulse",    color:"#a78bfa" },
  { label:"kf-flip-x",   color:"#f472b6" },
  { label:"kf-zoom-in",  color:"#34d399" },
  { label:"kf-rubber",   color:"#fb923c" },
  { label:"kf-wobble",   color:"#67e8f9" },
  { label:"kf-jello",    color:"#c084fc" },
  { label:"kf-swing",    color:"#f9a8d4" },
];

/* varied widths per row to make grid feel organic */
const ROW1_WIDTHS = [220, 280, 200, 260, 240, 300, 220, 280, 200, 260, 240, 300];
const ROW2_WIDTHS = [260, 200, 300, 220, 280, 240, 260, 200, 300, 220, 280, 240];
const ROW3_WIDTHS = [240, 300, 220, 280, 200, 260, 240, 300, 220, 280, 200, 260];

const totalAnimations = animations.length;

  const getCategoryCount = (categoryName) => {
    if (categoryName === 'All') return totalAnimations;
    return animations.filter((item) => item.category === categoryName).length;
  };

const CATEGORIES = [
  {
    demo: 'fade-in',
    name: 'Entrance',
    count: '24 animations',
    glow: 'rgba(167,139,250,.10)',
    accent: '#a78bfa',
  },
  {
    demo: 'text',
    name: 'Text',
    count: '16 animations',
    glow: 'rgba(167,139,250,.10)',
    accent: '#a78bfa',
  },
  {
    demo: 'fade',
    name: 'Fading',
    count: '12 animations',
    glow: 'rgba(52,211,153,.10)',
    accent: '#34d399',
  },
  {
    demo: 'rotate',
    name: 'Rotating',
    count: '12 animations',
    glow: 'rgba(103,232,249,.10)',
    accent: '#67e8f9',
  },
  {
    demo: 'bounce',
    name: 'Bouncing',
    count: '10 animations',
    glow: 'rgba(251,146,60,.10)',
    accent: '#fb923c',
  },
  {
    demo: 'spin',
    name: 'Loaders',
    count: '18 animations',
    glow: 'rgba(52,211,153,.10)',
    accent: '#34d399',
  },
  {
    demo: 'slide',
    name: 'Sliding',
    count: '16 animations',
    glow: 'rgba(251,146,60,.10)',
    accent: '#fb923c',
  },
  {
    demo: 'shake',
    name: 'Attention',
    count: '14 animations',
    glow: 'rgba(244,114,182,.10)',
    accent: '#f472b6',
  },
  {
    demo: 'fade-out',
    name: 'Exit',
    count: '24 animations',
    glow: 'rgba(244,114,182,.10)',
    accent: '#f472b6',
  },
];

function DemoShape({ type, accent }) {
  if (type === 'fade-in')
    return (
      <div className="flex flex-col gap-2 items-center">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={`h-2 rounded-full anim-demo-fade-${n}`}
            style={{ background: accent, width: `${80 - n * 16}px` }}
          />
        ))}
      </div>
    );

  if (type === 'fade-out')
    return (
      <div className="flex flex-col gap-2 items-center">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={`h-2 rounded-full anim-demo-fade-${4 - n}`}
            style={{ background: accent, width: `${40 + n * 16}px` }}
          />
        ))}
      </div>
    );

  if (type === 'fade')
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map(n => (
          <div
            key={n}
            className={`w-3 h-3 rounded-sm anim-demo-fade-${n}`}
            style={{ background: accent }}
          />
        ))}
      </div>
    );

  if (type === 'slide')
    return (
      <div
        className="w-12 h-3.5 rounded-full anim-demo-slide"
        style={{ background: `linear-gradient(90deg,#a78bfa,#f472b6)` }}
      />
    );

  if (type === 'rotate')
    return (
      <div
        className="w-8 h-8 rounded-full border-2 border-transparent anim-demo-spin"
        style={{ borderTopColor: accent, borderRightColor: accent }}
      />
    );

  if (type === 'bounce')
    return <div className="w-6 h-6 rounded-full anim-demo-bounce" style={{ background: accent }} />;

  if (type === 'spin')
    return (
      <div className="relative w-8 h-8">
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent anim-demo-spin"
          style={{ borderTopColor: accent }}
        />
        <div
          className="absolute inset-2 rounded-full border-2 border-transparent anim-demo-spin"
          style={{ borderTopColor: accent, opacity: 0.5, animationDirection: 'reverse' }}
        />
      </div>
    );

  if (type === 'shake')
    return <div className="w-7 h-7 rounded-lg anim-demo-shake" style={{ background: accent }} />;

  if (type === 'text')
    return (
      <div className="flex gap-1">
        {['T', 'e', 'x', 't'].map((l, i) => (
          <span
            key={i}
            className={`font-mono-jb text-lg font-bold anim-demo-fade-${(i % 4) + 1}`}
            style={{ color: accent }}
          >
            {l}
          </span>
        ))}
      </div>
    );

  if (type === 'pulse')
    return (
      <div className="relative w-7 h-7">
        <div
          className="absolute inset-0 rounded-full border-2 anim-pulse-ring"
          style={{ borderColor: accent }}
        />
        <div
          className="absolute inset-1.5 rounded-full anim-pulse-core"
          style={{ background: accent }}
        />
      </div>
    );

  return null;
}

/*  MAIN COMPONENT*/
export default function Home({ onEnter, searchQuery, setSearchQuery, animations = [] , onNavigate }) {
  const doubled = [...CHIPS, ...CHIPS];

    const totalAnimations = animations.length;
    const totalCommunityAnimations = animations.filter(item => item.isCommunity).length;


    const STATS = [
      {
        num: totalAnimations + '+',
        label: `Pre-Builed ${totalAnimations} Animations In Different Categories`,
        icon: <MdOutlineAnimation size={44} className="text-white/70" />,
      },
      {
        num: '100%',
        label: 'Free for personal and commercial use',
        icon: <FaGift size={44} className="text-white/70" />,
      },
      {
        num: totalCommunityAnimations,
        label: 'Contributors to the community',
        icon: <FaUsers size={44} className="text-white/70" />,
      },
    ];

  return (
    <>
      <style>{KEYFRAMES}</style>

      <div className="font-grotesk relative min-h-screen overflow-x-hidden text-[#f0eeff] bg-[#050505]">
        {/* Hero*/}
        <section className="flex flex-col items-center relative z-[8] max-w-full px-6 md:px-12 pb-20 pt-15">
          <div className="font-outfit mb-4 inline-flex items-center gap-2 px-4 py-1.5 text-xs text-violet-400">
            <div className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-violet-400" />
            Open-source · {totalAnimations}+ animations · Zero dependencies
          </div>

          <h1 className="text-[clamp(60px,7vw,172px)] font-bold font-heading leading-[.9] tracking-[-2px] text-center">
            Motion that
            <br />
            <span className="gradient-text">feels alive.</span>
          </h1>

          <p className="mt-5 max-w-[90%] md:max-w-lg text-[13px] md:text-[17px] font-normal leading-[1.25] text-center text-white/80">
            A production-ready CSS keyframe animation library. Drop in buttery-smooth transitions,
            entrances, and micro-interactions with a single class name.
          </p>

          <div className="search-box mt-5 flex w-full max-w-[550px] h-14 md:h-16 items-center overflow-hidden rounded-[12px] border border-white/10  transition-all duration-200 bg-white">
            <div className="flex items-center px-4 text-[#6b6880]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search animations… e.g. bounce, fade"
              value={searchQuery}
              onChange={e => setSearchQuery?.(e.target.value)}
              className="flex-1 bg-transparent relative right-2 py-4 text-[15px] text-[#000] outline-none placeholder:text-[#3f3d4e]"
            />
            <button
              onClick={() => onEnter?.()}
              className="font-grotesk m-1.5 rounded-[10px] px-6 md:px-8 h-11 md:h-13 text-[15px] font-bold text-white transition-all duration-150 hover:opacity-85 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#f472b6)' }}
            >
              Search
            </button>
          </div>
        </section>

        {/* ticker */}
        <div className="relative z-[5] bottom-28 overflow-hidden  bg-black">
          {/* Row 1 — left to right */}
          <div className="anim-ticker-1 flex gap-3 mb-3" style={{ width: 'max-content' }}>
            {doubled.map((chip, i) => (
              <div
                key={i}
                className="flex cursor-pointer flex-col justify-between rounded-[8px] border border-white/[.07] bg-[#111111] whitespace-nowrap transition-colors duration-200 hover:border-violet-400/30"
                style={{
                  width: ROW1_WIDTHS[i % ROW1_WIDTHS.length],
                  height: 180,
                  padding: '18px 20px',
                }}
              >
                <div className="h-4 w-4 rounded-full" style={{ background: chip.color }} />
                <span className="font-mono-jb text-sm text-[#6b6880]">{chip.label}</span>
              </div>
            ))}
          </div>

          {/* Row 2 — right to left */}
          <div className="anim-ticker-2 flex gap-3 mb-3" style={{ width: 'max-content' }}>
            {doubled.map((chip, i) => (
              <div
                key={i}
                className="flex cursor-pointer flex-col justify-between rounded-[8px] border border-white/[.07] bg-[#111111] whitespace-nowrap transition-colors duration-200 hover:border-violet-400/30"
                style={{
                  width: ROW2_WIDTHS[i % ROW2_WIDTHS.length],
                  height: 200,
                  padding: '18px 20px',
                }}
              >
                <div className="h-4 w-4 rounded-full" style={{ background: chip.color }} />
                <span className="font-mono-jb text-sm text-[#6b6880]">{chip.label}</span>
              </div>
            ))}
          </div>

          {/* Row 3 — left to right, faster */}
          <div className="anim-ticker-3 flex gap-3" style={{ width: 'max-content' }}>
            {doubled.map((chip, i) => (
              <div
                key={i}
                className="flex cursor-pointer flex-col justify-between rounded-[8px] border border-white/[.07] bg-[#111111] whitespace-nowrap transition-colors duration-200 hover:border-violet-400/30"
                style={{
                  width: ROW3_WIDTHS[i % ROW3_WIDTHS.length],
                  height: 190,
                  padding: '18px 20px',
                }}
              >
                <div className="h-4 w-4 rounded-full" style={{ background: chip.color }} />
                <span className="font-mono-jb text-sm text-[#6b6880]">{chip.label}</span>
              </div>
            ))}
          </div>

          {/* bottom dim + button */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center"
            style={{
              background: 'linear-gradient(to top, #000000 0%, #000000 30%, transparent 100%)',
            }}
          >
            <button
              onClick={() => onEnter?.()}
              className="flex items-center gap-2.5 rounded-[8px] px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:opacity-85 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#f472b6)' }}
            >
              <Rocket size={18} />
              Browse all Animations
            </button>
          </div>
        </div>

        {/* Stats*/}
        <div className="anim-fade-up-4 relative z-[5] py-10 gap-5 px-6 md:px-12 md:pt-30 md:pb-20 flex flex-col md:flex-row items-center  flex-nowrap justify-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex flex-col gap-0.5 items-center">
                <span>{s.icon}</span>
                <span className="text-[48px] md:text-[55px] font-extrabold font-heading tracking-tight text-[#f0eeff]">
                  {s.num}
                </span>
                <span className="font-outfit text-[15px] relative bottom-2 text-white/70 font-bold max-w-[200px] text-center">
                  {s.label}
                </span>
              </div>
              {i < STATS.length - 1 && <div className="h-8 w-px bg-white/[.07]" />}
            </div>
          ))}
        </div>

        {/* categories */}
        <section className="relative z-[5] px-6 md:px-12 py-20 md:py-40">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className=" mb-2 text-[11px] uppercase tracking-[.2em] text-violet-400 font-heading">
                categories
              </p>
              <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight font-outfit">
                Every motion you need
              </h2>
            </div>
            <button
              onClick={() => onEnter?.()}
              className="font-outfit flex items-center gap-1.5 font-outfit text-[13px] text-[#6b6880] transition-colors duration-200 hover:text-violet-400"
            >
              <span>View all {totalAnimations}</span> <FaArrowRightLong />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map(cat => (
              <div
                onClick={()=> onNavigate("Home" , cat.name)}
                key={cat.name}
                className="cat-card-glow group relative cursor-pointer overflow-hidden rounded-[8px] border border-white/[.07] bg-[#0f0f14] px-5 py-5 transition-all duration-200 hover:border-white/[.13]"
                style={{ '--glow': cat.glow }}
              >
                <div
                  className="accent-line absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg,transparent,${cat.accent}66,transparent)`,
                  }}
                />
                <div className="mb-5 flex h-40 w-full items-center justify-center overflow-hidden rounded-[8px] bg-white/[.025]">
                  <DemoShape type={cat.demo} accent={cat.accent} />
                </div>
                <div className="mb-1 text-[19px] font-heading font-semibold tracking-[-0.3px]">
                  {cat.name}
                </div>
                <div className="font-outfit flex items-center justify-between text-xs text-[#6b6880]">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: cat.accent, opacity: 1 }}
                    />
                    {/* {cat.count} */}
                    {getCategoryCount(cat.name)} animations
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* cta */}
        <section className="relative z-[5] font-outfit overflow-hidden px-6 md:px-12 py-20 md:py-28 text-center">
          <h2 className="relative mb-3 text-[36px] md:text-[44px] font-bold tracking-[-2px] font-heading">
            Start animating <span className="gradient-text">today.</span>
          </h2>
          <p className="relative mb-10 text-[15px] text-[#6b6880]">
            Free, open-source, and ready for production.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onEnter?.()}
              className="inline-flex items-center gap-2 rounded-[8px] px-9 py-3.5 text-[15px] font-semibold text-white"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#f472b6)' }}
            >
              Explore Animations
            </button>
            <a
              href="https://github.com/byllzz/cssframes.git"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-[8px] border border-white/[.07] bg-white/[.03] px-8 py-3.5 text-[15px] font-medium text-[#6b6880] transition-all duration-200 hover:border-white/20 hover:text-[#f0eeff]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
