import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Is CssFrames completely free to use?",
    a: "Yes — 100% free and open-source under the MIT license. Use it in personal and commercial projects with no restrictions, no attribution required.",
  },
  {
    q: "Do I need to install anything?",
    a: "Nope. Just copy the @keyframes block and the animation utility class into your stylesheet. No npm install, no build pipeline, no dependencies. It's plain CSS.",
  },
  {
    q: "Does it work with React, Vue, Svelte, or Angular?",
    a: "Absolutely. Since every animation is pure CSS, it works with any JavaScript framework or vanilla HTML — just add the class name to any element.",
  },
  {
    q: "Can I use it with Tailwind CSS?",
    a: "Yes. Paste the @keyframes into your global.css or add them under the keyframes key in tailwind.config.js. Then use them alongside any Tailwind utilities.",
  },
  {
    q: "Do the animations respect prefers-reduced-motion?",
    a: "We recommend wrapping animation declarations in @media (prefers-reduced-motion: no-preference) for accessibility. Our docs include copy-paste examples for this.",
  },
  {
    q: "How do I contribute my own animation?",
    a: "Fork the repo on GitHub, add your @keyframes and class to the animations data file, then open a pull request. All quality submissions are welcome!",
  },
  {
    q: "Can I customise timing, easing, or colors?",
    a: "Of course. Every animation is just a CSS class — override animation-duration, animation-timing-function, or any property right on the element or in your own class.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section className="relative z-[5] px-6 md:px-12 py-20 md:py-28 bg-[#050505]">

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h2 className="text-[28px] md:text-[62px] font-bold tracking-tight font-heading mb-4">
          Questions?{" "}
          <span className="gradient-text">Answered.</span>
        </h2>
        <p className="font-outfit text-[14px] text-white/40 leading-relaxed">
          Everything you need to know before you start animating.
        </p>
      </div>

      {/* Accordion container */}
      <div className="max-w-2xl mx-auto rounded-[20px] border border-white/[0.06] overflow-hidden bg-[#0a0a0f]">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          const isLast = i === FAQ_ITEMS.length - 1;

          return (
            <div
              key={i}
              className={[
                "px-6 md:px-8 transition-colors duration-200",
                !isLast && "border-b border-white/[0.06] hover:border-violet-400/20",
              ].filter(Boolean).join(" ")}
            >
              {/* Trigger */}
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-[22px] bg-transparent border-none cursor-pointer text-left"
              >
                <span
                  className={[
                    "font-heading text-[15px] md:text-[16px] font-semibold leading-snug transition-colors duration-200",
                    isOpen ? "text-violet-400" : "text-white/90",
                  ].join(" ")}
                >
                  {item.q}
                </span>

                {/* Plus,  icon */}
                <span
                  className={[
                    "flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center",
                    "transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-violet-400/50 bg-violet-400/10"
                      : "border-white/10 bg-transparent",
                  ].join(" ")}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <line
                      x1="5" y1="1" x2="5" y2="9"
                      strokeWidth="1.5" strokeLinecap="round"
                      className={isOpen ? "stroke-violet-400" : "stroke-white/40"}
                    />
                    <line
                      x1="1" y1="5" x2="9" y2="5"
                      strokeWidth="1.5" strokeLinecap="round"
                      className={isOpen ? "stroke-violet-400" : "stroke-white/40"}
                    />
                  </svg>
                </span>
              </button>

              {/* Animated body  */}
              <div
                className={[
                  "overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0",
                ].join(" ")}
              >
                <p className="font-outfit text-[14px] text-white/50 leading-relaxed pb-5">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer nudge */}
      <div className="mt-10 text-center">
        <p className="font-outfit text-[13px] text-white/25">
          Still have questions?{" "}
          <a
            href="https://github.com/byllzz/cssframes.git"
            target="_blank"
            rel="noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
          >
            Open an issue on GitHub →
          </a>
        </p>
      </div>
    </section>
  );
}
