const STYLES = `
  @keyframes tag-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes tag-scroll-reverse {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }
  .tag-track-wrapper {
    display: flex;
    width: max-content;
    will-change: transform;
  }
  .tag-track {
    display: flex;
    gap: 8px;
    padding-right: 8px;
    flex-shrink: 0;
  }
  .anim-tag-1 { animation: tag-scroll 20s linear infinite; }
  .anim-tag-2 { animation: tag-scroll-reverse 14s linear infinite; }
  .anim-tag-3 { animation: tag-scroll 10s linear infinite; }
  .anim-tag-1:hover,
  .anim-tag-2:hover,
  .anim-tag-3:hover { animation-play-state: paused; }

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

  .tags-fade-left {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 120px;
    background: linear-gradient(to right, #050505 0%, transparent 100%);
    pointer-events: none;
    z-index: 2;
  }
  .tags-fade-right {
    position: absolute;
    right: 0; top: 0; bottom: 0;
    width: 120px;
    background: linear-gradient(to left, #050505 0%, transparent 100%);
    pointer-events: none;
    z-index: 2;
  }
`;

const ROW1_TAGS = ['bounce','fade-in','slide-up','rotate','shake','pulse','flip','zoom','glow','elastic','wobble','swing','blink','float','spin'];
const ROW2_TAGS = ['entrance','exit','attention','loader','text','button','icon','morph','ripple','typewriter','neon','blur','scale','skew','flicker'];
const ROW3_TAGS = ['keyframe','transition','loop','infinite','delay','ease-in','ease-out','spring','cubic','stagger','reveal','mask','clip','draw','trail'];

function TagChip({ tag, onNavigate }) {
  return (
    <div className="tag-chip" onClick={() => onNavigate?.('Home', 'All')}>
      {tag}
    </div>
  );
}

function TagRow({ tags, animClass, onNavigate }) {
  return (
    <div className="overflow-hidden relative">
      <div className="tags-fade-left" />
      <div className="tags-fade-right" />
      <div className={`tag-track-wrapper ${animClass}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="tag-track" aria-hidden={copy === 1 ? true : undefined}>
            {tags.map((tag) => (
              <TagChip key={tag} tag={tag} onNavigate={onNavigate} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrowseByTags() {
  return (
    <>
      <style>{STYLES}</style>

      <section className="mt-15 md:mt-30 relative w-full max-w-[1200px] mx-auto z-[5] py-16  overflow-hidden bg-[#050505]">
        {/* Header */}
        <div className="flex flex-col items-center text-center px-6 mb-12">

          <h2 className="text-[28px] md:text-[62px] font-bold tracking-tight font-heading mb-4 text-[#f0eeff]">
            Browse by{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Tags
            </span>
          </h2>
          <p className="font-outfit text-[14px] text-white/40 max-w-sm leading-relaxed">
            Hover to pause. Click any tag to jump straight to matching animations.
          </p>
        </div>

        {/* Scrolling rows */}
        <div className="flex flex-col gap-3">
          <TagRow tags={ROW1_TAGS} animClass="anim-tag-1" />
          <TagRow tags={ROW2_TAGS} animClass="anim-tag-2" />
          <TagRow tags={ROW3_TAGS} animClass="anim-tag-3" />
        </div>

        {/* Subtle top divider */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent)',
          }}
        />
        {/* Subtle bottom divider */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent)',
          }}
        />
      </section>
    </>
  );
}
