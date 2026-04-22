import { useState } from "react";

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
  .anim-ticker     { animation: ticker-scroll 28s linear infinite; }
  .anim-ticker:hover { animation-play-state: paused; }

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

  /* card hover glow via CSS custom property */
  .cat-card-glow::before {
    content:''; position:absolute; inset:0; border-radius:14px;
    opacity:0; transition:opacity .3s; background:var(--glow);
  }
  .cat-card-glow:hover::before { opacity:1; }

  /* top accent line */
  .cat-card-glow .accent-line { opacity:0; transition:opacity .3s; }
  .cat-card-glow:hover .accent-line { opacity:1; }

  /* gradient headline */
  .gradient-text {
    background: linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#fb923c 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
  }

  /* syntax colours */
  .syn-kw   { color:#c084fc; }
  .syn-str  { color:#86efac; }
  .syn-prop { color:#fca5a5; }
  .syn-cm   { color:#3d3a52; }

  /* search box focus ring */
  .search-box:focus-within {
    border-color:rgba(167,139,250,.45) !important;
    box-shadow:0 0 0 3px rgba(167,139,250,.12);
  }

  /* background grid */
  .bg-grid {
    background-image:
      linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,.025) 1px, transparent 1px);
    background-size:48px 48px;
  }
`;

/* ── data ── */
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

const CATEGORIES = [
  { demo:"bounce", name:"Attention Seekers", count:"32 animations", glow:"rgba(167,139,250,.10)", accent:"#a78bfa" },
  { demo:"fade",   name:"Entrances & Exits", count:"48 animations", glow:"rgba(244,114,182,.10)", accent:"#f472b6" },
  { demo:"rotate", name:"Rotating",          count:"16 animations", glow:"rgba(52,211,153,.10)",  accent:"#34d399" },
  { demo:"slide",  name:"Sliding",           count:"24 animations", glow:"rgba(251,146,60,.10)",  accent:"#fb923c" },
  { demo:"pulse",  name:"Pulsing & Glowing", count:"20 animations", glow:"rgba(244,114,182,.10)", accent:"#f472b6" },
  { demo:"shake",  name:"Shaking & Wobble",  count:"18 animations", glow:"rgba(167,139,250,.10)", accent:"#a78bfa" },
];

const STATS     = [
  { num:"180+", label:"Animations" },
  { num:"4.2kb",label:"Gzipped" },
  { num:"28k",  label:"GitHub Stars" },
  { num:"0",    label:"Dependencies" },
];
const NAV_LINKS = ["Docs","Library","Playground","Blog"];
const PILLS     = ["HTML","React","Tailwind","Vue","Svelte"];
const FEATURES  = [
  { icon:"⚡", text:"Zero runtime JavaScript" },
  { icon:"🎛️", text:"CSS variable overrides for timing & easing" },
  { icon:"📦", text:"Tree-shakeable — import only what you use" },
];
// const COMPANIES = ["Vercel","Linear","Loom","Raycast","Supabase"];

/* ── mini animation previews ── */
function DemoShape({ type, accent }) {
  if (type === "bounce")
    return <div className="w-6 h-6 rounded-full anim-demo-bounce" style={{ background:accent }} />;

  if (type === "fade")
    return (
      <div className="flex gap-1.5">
        {[1,2,3,4].map(n => (
          <div key={n} className={`w-3 h-3 rounded-sm anim-demo-fade-${n}`} style={{ background:accent }} />
        ))}
      </div>
    );

  if (type === "rotate")
    return (
      <div className="w-8 h-8 rounded-full border-2 border-transparent anim-demo-spin"
        style={{ borderTopColor:accent, borderRightColor:accent }} />
    );

  if (type === "slide")
    return (
      <div className="w-12 h-3.5 rounded-full anim-demo-slide"
        style={{ background:"linear-gradient(90deg,#a78bfa,#f472b6)" }} />
    );

  if (type === "pulse")
    return (
      <div className="relative w-7 h-7">
        <div className="absolute inset-0 rounded-full border-2 anim-pulse-ring"
          style={{ borderColor:accent }} />
        <div className="absolute inset-1.5 rounded-full anim-pulse-core"
          style={{ background:accent }} />
      </div>
    );

  if (type === "shake")
    return <div className="w-7 h-7 rounded-lg anim-demo-shake" style={{ background:accent }} />;

  return null;
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function KeyframesLanding({ onEnter, searchQuery, setSearchQuery }) {
  const [activePill, setActivePill] = useState("HTML");
  const doubled = [...CHIPS, ...CHIPS];

  return (
    <>
      <style>{KEYFRAMES}</style>

      <div className="font-grotesk relative min-h-screen overflow-x-hidden bg-[#060608] text-[#f0eeff]">

        {/* ── background decorations ── */}
        <div className="bg-grid pointer-events-none fixed inset-0 z-0" />
        {[
          { cls:"anim-orb-float", style:{ background:"radial-gradient(circle,rgba(167,139,250,.13),transparent 70%)", width:420, height:420, top:-96, left:-96, animationDelay:"0s" } },
          { cls:"anim-orb-float", style:{ background:"radial-gradient(circle,rgba(244,114,182,.11),transparent 70%)", width:320, height:320, top:192, right:-64, animationDelay:"-3s" } },
          { cls:"anim-orb-float", style:{ background:"radial-gradient(circle,rgba(52,211,153,.09),transparent 70%)",  width:260, height:260, bottom:96, left:"30%", animationDelay:"-5s" } },
        ].map((orb, i) => (
          <div key={i} className={`${orb.cls} pointer-events-none fixed z-0 rounded-full`}
            style={{ ...orb.style, filter:"blur(80px)" }} />
        ))}


        {/* ════════════ HERO ════════════ */}
        <section className="flex flex-col items-center relative z-[5] max-w-full px-12 pb-20 pt-15">

          <div className="font-mono-jb anim-fade-up-0 mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[.08] px-4 py-1.5 text-xs text-violet-400">
            <div className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-violet-400" />
            Open-source · 180+ animations · Zero dependencies
          </div>

          <h1 className="anim-fade-up-1 text-[clamp(42px,7vw,172px)] font-bold font-heading leading-[.9] tracking-[-2px] text-center">
            Motion that<br />
            <span className="gradient-text">feels alive.</span>
          </h1>

          <p className="anim-fade-up-2 mt-5 max-w-lg text-[17px] font-normal leading-[1.65] text-center text-[#6b6880]">
            A production-ready CSS keyframe animation library. Drop in buttery-smooth
            transitions, entrances, and micro-interactions with a single class name.
          </p>

          <div className="search-box anim-fade-up-3 mt-10 flex w-[600px] h-16 items-center overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f14] transition-all duration-200">
            <div className="flex items-center px-4  text-[#6b6880]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search animations… e.g. bounce, fade, slide"
              value={searchQuery}
              onChange={e => setSearchQuery?.(e.target.value)}
              className="flex-1 bg-transparent py-4 pl-2 pr-2 text-sm text-[#f0eeff] outline-none placeholder:text-[#3f3d4e]"
            />
            <button
              onClick={() => onEnter?.()}
              className="font-grotesk m-1.5 rounded-[8px] px-6 h-12 text-[16px] font-bold text-white transition-all duration-150 hover:opacity-85 active:scale-95"
              style={{ background:"linear-gradient(135deg,#a78bfa,#f472b6)" }}>
              Search
            </button>
          </div>
        </section>

        {/* ════════════ STATS ════════════ */}
        <div className="anim-fade-up-4 relative z-[5]  gap-5 px-12 pb-16 flex items-center justify-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-10">
              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-[70px] font-extrabold font-heading tracking-tight text-[#f0eeff]">{s.num}</span>
                <span className="font-mono-jb text-[11px] uppercase relative bottom-2 tracking-widest text-[#6b6880]">{s.label}</span>
              </div>
              {i < STATS.length - 1 && <div className="h-8 w-px bg-white/[.07]" />}
            </div>
          ))}
        </div>

        {/* ════════════ TICKER ════════════ */}
        <div className="relative z-[5] overflow-hidden border-y border-white/[.07] py-8"
          style={{ background:"linear-gradient(180deg,rgba(15,15,20,.85) 0%,transparent 50%,rgba(15,15,20,.85) 100%)" }}>
          <span className="font-mono-jb absolute left-12 top-1/2 z-10 -translate-y-1/2 text-[10px] uppercase tracking-[.2em] text-[#6b6880]">
            animations
          </span>
          <div className="anim-ticker flex gap-3" style={{ width:"max-content", paddingLeft:200 }}>
            {doubled.map((chip, i) => (
              <div key={i}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/[.07] bg-[#0f0f14] px-3.5 py-2 whitespace-nowrap transition-colors duration-200 hover:border-violet-400/30">
                <div className="h-2 w-2 rounded-full" style={{ background:chip.color }} />
                <span className="font-mono-jb text-xs text-[#6b6880]">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════ CATEGORIES ════════════ */}
        <section className="relative z-[5] px-12 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono-jb mb-2 text-[11px] uppercase tracking-[.2em] text-violet-400">categories</p>
              <h2 className="text-[28px] font-bold tracking-tight">Every motion you need</h2>
            </div>
            <a href="#" className="font-mono-jb flex items-center gap-1.5 text-[13px] text-[#6b6880] transition-colors duration-200 hover:text-violet-400">
              View all 180+ →
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {CATEGORIES.map(cat => (
              <div key={cat.name}
                className="cat-card-glow group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[.07] bg-[#0f0f14] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[.13]"
                style={{ "--glow":cat.glow }}>

                {/* top accent shimmer */}
                <div className="accent-line absolute inset-x-0 top-0 h-px"
                  style={{ background:`linear-gradient(90deg,transparent,${cat.accent}66,transparent)` }} />

                {/* demo */}
                <div className="mb-5 flex h-20 w-full items-center justify-center overflow-hidden rounded-xl bg-white/[.025]">
                  <DemoShape type={cat.demo} accent={cat.accent} />
                </div>

                <div className="mb-1 text-[15px] font-semibold tracking-[-0.3px]">{cat.name}</div>
                <div className="font-mono-jb flex items-center gap-1.5 text-xs text-[#6b6880]">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background:cat.accent, opacity:.7 }} />
                  {cat.count}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════ CODE SHOWCASE ════════════ */}
        <section className="relative z-[5] grid grid-cols-2 items-center gap-10 px-12 pb-20">

          {/* pitch */}
          <div>
            <p className="font-mono-jb mb-3 text-[11px] uppercase tracking-[.2em] text-violet-400">developer experience</p>
            <h2 className="mb-4 text-[34px] font-bold leading-[1.1] tracking-[-1.5px]">
              One class.<br />Full animation.
            </h2>
            <p className="mb-6 text-[15px] leading-[1.65] text-[#6b6880]">
              No JavaScript. No build step. Just add a class and watch your elements
              come to life. Customize duration, easing, and delay with CSS variables.
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {PILLS.map(p => (
                <button key={p} onClick={() => setActivePill(p)}
                  className={`font-mono-jb cursor-pointer rounded-full border px-3 py-1 text-[11px] transition-all duration-200
                    ${activePill === p
                      ? "border-violet-400/40 bg-violet-400/[.1] text-violet-400"
                      : "border-white/[.07] bg-[#0f0f14] text-[#6b6880] hover:border-white/20 hover:text-[#f0eeff]"
                    }`}>
                  {p}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {FEATURES.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#6b6880]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[.04] text-[13px]">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* code block */}
          <div className="overflow-hidden rounded-2xl border border-white/[.07] bg-[#0c0c10]">
            {/* titlebar */}
            <div className="flex items-center gap-2 border-b border-white/[.07] bg-white/[.02] px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28ca41]" />
              <span className="font-mono-jb ml-auto text-[12px] text-[#6b6880]">index.html</span>
            </div>

            {/* code */}
            <pre className="font-mono-jb overflow-x-auto p-5 text-[12px] leading-[1.9] text-[#6b6880]">
              <span className="syn-cm">{"<!-- 1. Install -->"}</span>{"\n"}
              <span className="syn-kw">{"<link"}</span>{" "}<span className="syn-prop">rel</span>{"="}<span className="syn-str">{'"stylesheet"'}</span>{"\n  "}
              <span className="syn-prop">href</span>{"="}<span className="syn-str">{'"keyframes.min.css"'}</span><span className="syn-kw">{">"}</span>
              {"\n\n"}
              <span className="syn-cm">{"<!-- 2. Use it -->"}</span>{"\n"}
              <span className="syn-kw">{"<div"}</span>{" "}<span className="syn-prop">class</span>{"="}<span className="syn-str">{'"kf-bounce"'}</span><span className="syn-kw">{">"}</span>
              {"\n  Hello, World!\n"}<span className="syn-kw">{"</div>"}</span>
              {"\n\n"}
              <span className="syn-cm">{"<!-- 3. Customize -->"}</span>{"\n"}
              <span className="syn-kw">{"<div"}</span>{" "}<span className="syn-prop">class</span>{"="}<span className="syn-str">{'"kf-slide-up"'}</span>{"\n  "}
              <span className="syn-prop">style</span>{"="}<span className="syn-str">{`"
    --kf-duration: 0.6s;
    --kf-delay:    0.2s;
    --kf-easing:   cubic-bezier(.34,1.56,.64,1);
  "`}</span><span className="syn-kw">{">"}</span>
              {"\n  Buttery smooth ✦\n"}<span className="syn-kw">{"</div>"}</span>
            </pre>

            {/* copy bar */}
            <div className="flex items-center justify-between border-t border-white/[.07] bg-white/[.015] px-4 py-2.5">
              <span className="font-mono-jb text-[11px] text-[#3d3a52]">npm i keyframes.css</span>
              <button className="font-mono-jb rounded-md border border-white/[.07] bg-white/[.04] px-3 py-1 text-[11px] text-[#6b6880] transition-colors hover:border-violet-400/30 hover:text-violet-400">
                Copy
              </button>
            </div>
          </div>
        </section>


        {/* ════════════ CTA ════════════ */}
        <section className="relative z-[5] overflow-hidden px-12 py-28 text-center">
          {/* background glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[300px] w-[600px] rounded-full opacity-[.18]"
              style={{ background:"radial-gradient(ellipse,#a78bfa,transparent 70%)", filter:"blur(60px)" }} />
          </div>

          <p className="font-mono-jb relative mb-4 text-[11px] uppercase tracking-[.25em] text-violet-400">get started</p>
          <h2 className="relative mb-3 text-[44px] font-bold tracking-[-2px]">
            Start animating <span className="gradient-text">today.</span>
          </h2>
          <p className="relative mb-10 text-[15px] text-[#6b6880]">Free, open-source, and ready for production.</p>

          <div className="relative flex items-center justify-center gap-3">
            <button
              onClick={() => onEnter?.()}
              className="inline-flex items-center gap-2 rounded-[8px] px-9 py-3.5 text-[15px] font-semibold text-white "
              style={{ background:"linear-gradient(135deg,#a78bfa,#f472b6)" }}>
              Explore Now
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.03] px-8 py-3.5 text-[15px] font-medium text-[#6b6880] transition-all duration-200 hover:border-white/20 hover:text-[#f0eeff]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View on GitHub
            </button>
          </div>
        </section>


      </div>
    </>
  );
}
