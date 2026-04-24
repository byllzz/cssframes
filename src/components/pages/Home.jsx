import { Rocket } from "lucide-react";
import { FaArrowRightLong, FaGift, FaUsers, FaGithub } from "react-icons/fa6";
import { MdOutlineAnimation } from "react-icons/md";
import { animations as animationsData } from "../../data/animations";

const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
  .font-mono-jb { font-family: 'JetBrains Mono', monospace; }

  @keyframes pulse-dot {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: .35; transform: scale(.65); }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ticker-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes ticker-scroll-reverse {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }

  @keyframes demo-bounce {
    0%,100% { transform: translateY(0); }
    40% { transform: translateY(-22px); }
    70% { transform: translateY(-10px); }
  }

  @keyframes demo-fade-seq {
    0%,100% { opacity: .15; transform: scale(.75); }
    50% { opacity: 1; transform: scale(1); }
  }

  @keyframes demo-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes demo-slide {
    from { transform: translateX(-18px); }
    to { transform: translateX(18px); }
  }

  @keyframes demo-pulse-core {
    0%,100% { transform: scale(1); }
    50% { transform: scale(1.18); }
  }

  @keyframes demo-pulse-ring {
    0% { transform: scale(1); opacity: .7; }
    100% { transform: scale(2.1); opacity: 0; }
  }

  @keyframes demo-shake {
    0%,100% { transform: translateX(0) rotate(0); }
    20% { transform: translateX(-7px) rotate(-4deg); }
    40% { transform: translateX(7px) rotate(4deg); }
    60% { transform: translateX(-4px) rotate(-2deg); }
    80% { transform: translateX(4px) rotate(2deg); }
  }

  @keyframes card-shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }

  @keyframes count-glow {
    0%,100% { text-shadow: 0 0 8px var(--accent); }
    50% { text-shadow: 0 0 20px var(--accent), 0 0 40px var(--accent); }
  }

  @keyframes code-blink {
    0%,100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes border-spin {
    to { transform: rotate(360deg); }
  }

  .anim-pulse-dot { animation: pulse-dot 1.5s ease infinite; }

  .anim-fade-up-0 { animation: fade-up .6s ease both; }
  .anim-fade-up-1 { animation: fade-up .6s .1s ease both; }
  .anim-fade-up-2 { animation: fade-up .6s .2s ease both; }
  .anim-fade-up-3 { animation: fade-up .6s .3s ease both; }
  .anim-fade-up-4 { animation: fade-up .6s .4s ease both; }

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
  .anim-demo-spin { animation: demo-spin 1s linear infinite; }
  .anim-demo-slide { animation: demo-slide 1.4s ease-in-out infinite alternate; }
  .anim-pulse-core { animation: demo-pulse-core 1.2s ease-out infinite; }
  .anim-pulse-ring { animation: demo-pulse-ring 1.2s ease-out infinite; }
  .anim-demo-shake { animation: demo-shake .6s ease-in-out infinite; }

  .gradient-text {
    background: linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #fb923c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .search-box:focus-within {
    border-color: rgba(167,139,250,.45) !important;
    box-shadow: 0 0 0 3px rgba(167,139,250,.12);
  }

  .tag-chip {
    display: inline-flex;
    align-items: center;
    padding: 8px 14px;
    border-radius: 5px;
    border: 1px solid rgba(255,255,255,0.07);
    background: #161616;
    font-size: 12px;
    color: rgba(255,255,255,0.45);
    white-space: nowrap;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    font-family: 'Arial', monospace;
    font-weight: bold;
  }

  .tag-chip:hover {
    border-color: rgba(167,139,250,0.4);
    color: #a78bfa;
    background: rgba(167,139,250,0.06);
  }

  @keyframes tag-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes tag-scroll-reverse {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }

  .anim-tag-1 { animation: tag-scroll 50s linear infinite; }
  .anim-tag-2 { animation: tag-scroll-reverse 44s linear infinite; }
  .anim-tag-3 { animation: tag-scroll 30s linear infinite; }
  .anim-tag-1:hover,
  .anim-tag-2:hover,
  .anim-tag-3:hover { animation-play-state: paused; }

  .discord-card {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    background: linear-gradient(135deg, #0d0d1a 0%, #0a0a0f 100%);
    border: 1px solid rgba(88,101,242,0.2);
    transition: border-color 0.3s ease, transform 0.3s ease;
  }

  .discord-card:hover {
    border-color: rgba(88,101,242,0.45);
    transform: translateY(-2px);
  }

  .discord-card::before {
    content: '';
    position: absolute;
    top: -60px;
    left: -60px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(88,101,242,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .figma-card {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    background: linear-gradient(135deg, #0f0d14 0%, #0a0a0f 100%);
    border: 1px solid rgba(167,139,250,0.15);
    transition: border-color 0.3s ease, transform 0.3s ease;
  }

  .figma-card:hover {
    border-color: rgba(167,139,250,0.35);
    transform: translateY(-2px);
  }

  .step-card {
    position: relative;
    background: #0a0a0f;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    transition: border-color 0.3s ease, transform 0.3s cubic-bezier(.34,1.56,.64,1);
  }

  .step-card:hover {
    border-color: rgba(167,139,250,0.25);
    transform: translateY(-3px);
  }

  .step-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.07) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .step-card:hover::before { opacity: 1; }

  .step-number {
    background: linear-gradient(135deg, #a78bfa22, #f472b611);
    border: 1px solid rgba(167,139,250,0.2);
    border-radius: 10px;
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .step-card:hover .step-number {
    background: linear-gradient(135deg, #a78bfa33, #f472b622);
    border-color: rgba(167,139,250,0.4);
  }

  .code-cursor {
    display: inline-block;
    width: 2px;
    height: 14px;
    background: #a78bfa;
    margin-left: 2px;
    vertical-align: middle;
    animation: code-blink 1s ease infinite;
  }

  .cat-card-v2 {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 16px;
    background: #0a0a0f;
    border: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .cat-card-v2:hover {
    transform: translateY(-4px) scale(1.01);
    border-color: rgba(255,255,255,0.14);
    box-shadow: 0 20px 60px -12px var(--card-shadow);
  }

  .cat-card-v2::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--accent-a) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    border-radius: 16px;
  }

  .cat-card-v2:hover::after { opacity: 1; }

  .shimmer-line {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
    transform: translateX(-100%) skewX(-15deg);
    pointer-events: none;
    border-radius: 16px;
  }

  .cat-card-v2:hover .shimmer-line {
    animation: card-shimmer 0.7s ease forwards;
  }

  .demo-stage {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
  }

  .demo-stage::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, var(--accent-b) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .cat-card-v2:hover .demo-stage::before { opacity: 1; }

  .float-bg-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(24px);
    animation: float-shape 4s ease-in-out infinite;
    pointer-events: none;
  }

  .cat-count {
    font-variant-numeric: tabular-nums;
    transition: color 0.3s ease;
  }

  .cat-card-v2:hover .cat-count {
    animation: count-glow 1.5s ease infinite;
  }

  .arrow-icon {
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .cat-card-v2:hover .arrow-icon {
    opacity: 1;
    transform: translateX(0);
  }


  .cat-card-glow::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    opacity: 0;
    transition: opacity .3s;
    background: var(--glow);
  }

  .cat-card-glow:hover::before { opacity: 1; }

  .cat-card-glow .accent-line {
    opacity: 0;
    transition: opacity .3s;
  }

  .cat-card-glow:hover .accent-line { opacity: 1; }

  .syn-kw { color: #c084fc; }
  .syn-str { color: #86efac; }
  .syn-prop { color: #fca5a5; }
  .syn-cm { color: #3d3a52; }
`;

const CHIPS = [
  { label: "bounce", color: "#a78bfa" },
  { label: "fade-in", color: "#f472b6" },
  { label: "slide-up", color: "#34d399" },
  { label: "rotate", color: "#fb923c" },
  { label: "shake", color: "#67e8f9" },
  { label: "pulse", color: "#a78bfa" },
  { label: "flip-x", color: "#f472b6" },
  { label: "zoom-in", color: "#34d399" },
  { label: "rubber", color: "#fb923c" },
  { label: "wobble", color: "#67e8f9" },
  { label: "jello", color: "#c084fc" },
  { label: "swing", color: "#f9a8d4" },
];

const ROW1_WIDTHS = [220, 280, 200, 260, 240, 300, 220, 280, 200, 260, 240, 300];
const ROW2_WIDTHS = [260, 200, 300, 220, 280, 240, 260, 200, 300, 220, 280, 240];
const ROW3_WIDTHS = [240, 300, 220, 280, 200, 260, 240, 300, 220, 280, 200, 260];

const STEPS = [
  {
    num: "01",
    title: "Browse & pick",
    desc: "Explore the library by category. Each card shows a live preview of the animation running in real time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    accent: "#a78bfa",
    code: null,
    isPreview: true,
  },
  {
    num: "02",
    title: "Copy the keyframe",
    desc: "One click copies the full @keyframes block and the animation class. Paste it directly into your stylesheet.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
    accent: "#f472b6",
    code: "@keyframes bounce { … }",
    isPreview: false,
  },
  {
    num: "03",
    title: "Apply & ship",
    desc: "Add the class to any element. Works with plain CSS, Tailwind, styled-components, or any framework.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    accent: "#34d399",
    code: 'class="kf-bounce"',
    isPreview: false,
  },
];



export default function Home({
  onEnter,
  searchQuery,
  setSearchQuery,
  animations = animationsData,
  onNavigate,
}) {
  const doubled = [...CHIPS, ...CHIPS];
  const totalAnimations = animations.length;
  const totalCommunityAnimations = animations.filter((item) => item.isCommunity).length;

  const STATS = [
    {
      num: `${totalAnimations}+`,
      label: `Pre-Built ${totalAnimations} Animations In Different Categories`,
      icon: <MdOutlineAnimation size={44} className="text-white/70" />,
    },
    {
      num: "100%",
      label: "Free for personal and commercial use",
      icon: <FaGift size={44} className="text-white/70" />,
    },
    {
      num: totalCommunityAnimations,
      label: "Contributors to the community",
      icon: <FaUsers size={44} className="text-white/70" />,
    },
  ];

  return (
    <>
      <style>{KEYFRAMES}</style>

      <div className="font-grotesk relative min-h-screen overflow-x-hidden text-[#f0eeff] bg-[#050505]">
        {/* HERO */}
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

          <div className="search-box mt-5 flex w-full max-w-[550px] h-14 md:h-16 items-center overflow-hidden rounded-[12px] border border-white/10 transition-all duration-200 bg-white">
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
              className="font-grotesk m-1.5 rounded-[10px] px-6 md:px-8 h-11 md:h-13 text-[15px] font-bold text-white transition-all duration-150 hover:opacity-85"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#f472b6)' }}
            >
              Search
            </button>
          </div>
        </section>

        {/* TICKER */}
        <div className="relative z-[5] bottom-28 overflow-hidden bg-black">
          <div className=" flex gap-3 mb-3" style={{ width: 'max-content' }}>
            {doubled.map((chip, i) => (
              <div
                key={`r1-${i}`}
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

          <div className=" flex gap-3 mb-3" style={{ width: 'max-content' }}>
            {doubled.map((chip, i) => (
              <div
                key={`r2-${i}`}
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

          <div className=" flex gap-3" style={{ width: 'max-content' }}>
            {doubled.map((chip, i) => (
              <div
                key={`r3-${i}`}
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

          <div
            className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center"
            style={{
              background: 'linear-gradient(to top, #000000 0%, #000000 30%, transparent 100%)',
            }}
          >
            <button
              onClick={() => onEnter?.()}
              className="flex items-center gap-2.5 rounded-[8px] px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:opacity-85"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#f472b6)' }}
            >
              <Rocket size={18} />
              Browse all Animations
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="anim-fade-up-4 relative z-[5] py-10 gap-5 px-6 md:px-12 md:pt-30 md:pb-20 flex flex-col md:flex-row items-center flex-nowrap justify-center">
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

        {/* BROWSE BY TAGS */}
        <section className="relative w-full z-[5] py-10 md:py-20 overflow-hidden bg-[#050505] rounded-2xl">
          <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[24px] md:text-[34px] font-bold tracking-tight font-heading">
            Browse by Tags
          </h2>

          <div className="flex flex-col gap-4 overflow-hidden relative bottom-7">
            <div className="anim-tag-1 flex gap-2" style={{ width: 'max-content' }}>
              {[...Array(2)].flatMap(() =>
                [
                  'bounce',
                  'fade-in',
                  'slide-up',
                  'rotate',
                  'shake',
                  'pulse',
                  'flip',
                  'zoom',
                  'glow',
                  'elastic',
                  'wobble',
                  'swing',
                  'blink',
                  'float',
                  'spin',
                ].map((tag, i) => (
                  <div
                    key={`r1-${tag}-${i}`}
                    className="tag-chip"
                    onClick={() => onNavigate?.('Home', 'All')}
                  >
                    {tag}
                  </div>
                )),
              )}
            </div>

            <div className="anim-tag-2 flex gap-2" style={{ width: 'max-content' }}>
              {[...Array(2)].flatMap(() =>
                [
                  'entrance',
                  'exit',
                  'attention',
                  'loader',
                  'text',
                  'button',
                  'icon',
                  'morph',
                  'ripple',
                  'typewriter',
                  'neon',
                  'blur',
                  'scale',
                  'skew',
                  'flicker',
                ].map((tag, i) => (
                  <div
                    key={`r2-${tag}-${i}`}
                    className="tag-chip"
                    onClick={() => onNavigate?.('Home', 'All')}
                  >
                    {tag}
                  </div>
                )),
              )}
            </div>

            <div className="anim-tag-3 flex gap-2" style={{ width: 'max-content' }}>
              {[...Array(2)].flatMap(() =>
                [
                  'keyframe',
                  'transition',
                  'loop',
                  'infinite',
                  'delay',
                  'ease-in',
                  'ease-out',
                  'spring',
                  'cubic',
                  'stagger',
                  'reveal',
                  'mask',
                  'clip',
                  'draw',
                  'trail',
                ].map((tag, i) => (
                  <div
                    key={`r3-${tag}-${i}`}
                    className="tag-chip"
                    onClick={() => onNavigate?.('Home', 'All')}
                  >
                    {tag}
                  </div>
                )),
              )}
            </div>
          </div>
        </section>

        {/* GITHUB + FIGMA */}
        <section className="relative z-[5] md:px-12 py-10 md:py-16">
          <div className="max-w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="discord-card p-8 flex flex-col justify-between min-h-[350px]">
              <div className="flex items-center gap-2 mb-6">
                <FaGithub size={45} />
              </div>

              <div className="flex-1">
                <h3 className="font-heading text-[22px] md:text-[26px] font-bold text-white mb-2 leading-tight">
                  Star on Github
                  <br />
                  CssFrames <span className="text-indigo-500">Galaxy</span>
                </h3>
                <p className="font-outfit text-[13px] text-white/40 mb-6">
                  An open space for CSS animation designers and developers.
                </p>
              </div>

              <a
                href="https://github.com/byllzz/cssframes.git"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 self-start rounded-[10px] px-5 py-2.5 text-[14px] font-semibold text-white transition-all duration-150 hover:opacity-85 active:scale-95"
                style={{ background: '#5865F2' }}
              >
                <FaGithub size={20} />
                Star on Github
              </a>

              <div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(88,101,242,0.12) 0%, transparent 70%)',
                  transform: 'translate(30%, 30%)',
                }}
              />
            </div>

            <div className="figma-card p-8 flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center gap-3 mb-6">
                <svg width="28" height="28" viewBox="0 0 38 57" fill="none">
                  <path
                    d="M19 28.5C19 25.48 21.46 23 24.5 23C27.54 23 30 25.48 30 28.5C30 31.52 27.54 34 24.5 34C21.46 34 19 31.52 19 28.5Z"
                    fill="#1ABCFE"
                  />
                  <path
                    d="M8 39.5C8 36.48 10.46 34 13.5 34H19V39.5C19 42.52 16.54 45 13.5 45C10.46 45 8 42.52 8 39.5Z"
                    fill="#0ACF83"
                  />
                  <path
                    d="M19 12V23H24.5C27.54 23 30 20.52 30 17.5C30 14.48 27.54 12 24.5 12H19Z"
                    fill="#FF7262"
                  />
                  <path
                    d="M8 17.5C8 20.52 10.46 23 13.5 23H19V12H13.5C10.46 12 8 14.48 8 17.5Z"
                    fill="#F24E1E"
                  />
                  <path
                    d="M8 28.5C8 31.52 10.46 34 13.5 34H19V23H13.5C10.46 23 8 25.48 8 28.5Z"
                    fill="#A259FF"
                  />
                </svg>
                <span className="font-heading text-[15px] font-bold text-white">Use in Figma</span>
              </div>

              <div className="flex-1">
                <h3 className="font-heading text-[22px] md:text-[26px] font-bold text-white mb-2 leading-tight">
                  Copy animations
                  <br />
                  straight to Figma.
                </h3>
                <p className="font-outfit text-[13px] text-white/40 mb-6">
                  Grab any keyframe and paste it directly into your Figma prototypes and motion
                  specs.
                </p>
              </div>

              <button
                onClick={() => onEnter?.()}
                className="inline-flex items-center gap-2 self-start rounded-[10px] border border-white/[.08] bg-white/[.04] px-5 py-2.5 text-[14px] font-medium text-white/70 transition-all duration-200 hover:border-violet-400/40 hover:text-white hover:bg-white/[.07]"
              >
                Browse animations
                <FaArrowRightLong size={12} />
              </button>

              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 80% 20%, rgba(167,139,250,0.08) 0%, transparent 60%)',
                }}
              />
            </div>
          </div>
        </section>

        <section className="relative z-[5] px-6 md:px-12 py-24 md:py-36 bg-[#050505]">
          {/* HEADER */}
          <div className="mb-16 flex flex-col items-center text-center">
            <p className="mb-3 text-[11px] uppercase tracking-[.25em] text-violet-400 font-heading">
              how it works
            </p>

            <h2 className="text-[28px] md:text-[46px] font-bold tracking-tight font-heading mb-4">
              From zero to animated in <span className="gradient-text">three steps</span>
            </h2>

            <p className="font-outfit text-[14px] text-white/40 max-w-md leading-relaxed">
              No build tools, no config, no headaches. Just copy, paste, and watch it move.
            </p>
          </div>

          {/* GRID */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* CONNECTOR LINE */}
            <div
              className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(167,139,250,0.4), rgba(244,114,182,0.4), transparent)',
              }}
            />

            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="group relative px-6 py-10 flex flex-col gap-6 rounded-[18px] border border-white/[0.06] bg-[#0a0a0f] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                {/* GLOW BACKDROP */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${step.accent}22, transparent 70%)`,
                  }}
                />

                {/* STEP HEADER */}
                <div className="relative flex items-center justify-between">
                  <div className="relative w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-black">
                    <span
                      className="font-mono-jb text-[13px] font-bold"
                      style={{ color: step.accent }}
                    >
                      {step.num}
                    </span>

                    {/* subtle ping */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition"
                      style={{
                        boxShadow: `0 0 20px ${step.accent}55`,
                      }}
                    />
                  </div>

                  <div className="opacity-60 group-hover:opacity-100 transition">
                    <div style={{ color: step.accent }}>{step.icon}</div>
                  </div>
                </div>

                {/* CODE / PREVIEW */}
                {step.code && (
                  <div
                    className="relative rounded-[10px] bg-black/70 border border-white/[0.06] px-3 py-2.5 font-mono-jb text-[11px]"
                    style={{ color: step.accent }}
                  >
                    {step.code}
                    <span className="code-cursor" />
                  </div>
                )}

                {step.isPreview && (
                  <div className="rounded-[10px] bg-black/70 border border-white/[0.06] px-3 py-2.5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-400 anim-pulse-dot" />
                    <span className="font-mono-jb text-[11px] text-white/30">live preview</span>
                  </div>
                )}

                {/* CONTENT */}
                <div className="relative">
                  <p className="font-heading text-[17px] font-semibold text-white mb-2">
                    {step.title}
                  </p>

                  <p className="font-outfit text-[13px] leading-relaxed text-white/45">
                    {step.desc}
                  </p>
                </div>

                {/* ACCENT LINE */}
                <div
                  className="mt-auto h-[2px] w-full rounded-full opacity-60 group-hover:opacity-100 transition"
                  style={{
                    background: `linear-gradient(90deg, ${step.accent}, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-[5] font-outfit overflow-hidden px-6 md:px-12 py-20 md:py-28 text-center">
          <h2 className="relative mb-3 text-[36px] md:text-[44px] font-bold tracking-[-2px] font-heading">
            Start animating <span className="gradient-text">today.</span>
          </h2>
          <p className="relative mb-10 text-[15px] text-[#6b6880]">
            Free, open-source, and ready for production.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-3">

            {/* <a
              href="https://github.com/byllzz/cssframes.git"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[8px] border border-white/[.07] bg-white/[.03] px-8 py-3.5 text-[15px] font-medium text-[#6b6880] transition-all duration-200 hover:border-white/20 hover:text-[#f0eeff]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a> */}
          </div>
        </section>
      </div>
    </>
  );
}
