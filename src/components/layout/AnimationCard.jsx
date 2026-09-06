import React, { useState, useMemo } from "react";
import { Share2, Star, Code2, Clock } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa6";
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX (<motion.div>), which this rule doesn't detect
import { motion, AnimatePresence } from "framer-motion";

export default function AnimationCard({
  animation,
  onCardClick,
  previewType,
  onShareClick,
}) {
  const [hovered, setHovered] = useState(false);

  const creator = animation.creator || {
    name: animation.creatorName || "Anonymous",
    github: animation.github,
    twitter: animation.twitter,
  };

  // Logic: Use global previewType if available, otherwise fallback to card-specific type
  const displayType = previewType || animation.type || "box";

  const uniqueId = useMemo(
    () => String(animation.id || "").replace(/[^a-zA-Z0-9]/g, ""),
    [animation.id],
  );

  const activeClass = `active-${uniqueId}`;
  const keyframeName = `kb-${uniqueId}`;
  const isDarkBg =
    animation.previewBg &&
    animation.previewBg !== "#e8e8e8" &&
    animation.previewBg !== "#ffffff";

  const finalCSS = useMemo(() => {
    const raw = animation.keyframes || "";
    const renamed = raw
      .replace(/@keyframes\s+[\w-]+\s*{/, `@keyframes ${keyframeName} {`)
      .replace(/my-anim/g, keyframeName);

    return `
      ${renamed}
      .${activeClass} {
        animation: ${keyframeName} ${animation.duration || "2s"} ease-in-out infinite !important;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    `;
  }, [animation.keyframes, animation.duration, keyframeName, activeClass]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-full bg-[#161616] border border-white/10 rounded-[8px] overflow-hidden transition-all duration-300 hover:border-white/20"
    >
      {/* Preview area — kept visually separate from the info panel below */}
      <div
        onClick={() => onCardClick(animation)}
        className="relative aspect-[4/3] flex items-center justify-center cursor-pointer transition-colors duration-500"
        style={{ backgroundColor: animation.previewBg || "#0d0d0d" }}
      >
        <style>{finalCSS}</style>

        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md z-10">
          <Clock size={10} className="text-white/60" />
          <span className="text-[10px] font-semibold text-white/70">
            {animation.duration || "2s"}
          </span>
        </div>

        {animation.isCommunity && (
          <div className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-md bg-[#ffffff]/15 text-[#ffffff]">
            Community
          </div>
        )}

        {/* The Animated Wrapper */}
        <div className={`${activeClass} pointer-events-none`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={displayType}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {displayType === "box" && (
                <div
                  className={`w-12 h-12 rounded-sm ${isDarkBg ? "bg-white" : "bg-[#ffffff]"}`}
                />
              )}
              {displayType === "circle" && (
                <div
                  className={`w-12 h-12 rounded-full ${isDarkBg ? "bg-white" : "bg-[#ffffff]"}`}
                />
              )}
              {displayType === "text" && (
                <h1
                  className={`text-5xl font-black tracking-tighter ${isDarkBg ? "text-white" : "text-[#ffffff]"}`}
                >
                  Aa
                </h1>
              )}
              {displayType === "icon" && (
                <Star
                  size={48}
                  className={`${isDarkBg ? "text-white fill-white" : "text-[#ffffff] fill-[#ffffff]"}`}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute right-0 bottom-0 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <button className="flex items-center gap-2 px-3.5 py-2 bg-[#ffffff] text-[#0d0d0d] text-[11px] font-bold uppercase tracking-wider rounded-tl-[5px]">
            <Code2 size={14} /> Get Code
          </button>
        </div>
      </div>

      {/* Info panel — visually split from the preview via the card's own border */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-1 overflow-hidden min-w-0">
            <h2 className="text-white font-semibold text-[13px] tracking-tight leading-tight truncate">
              {animation.title || "Untitled"}
            </h2>
            <p className="text-white/40 text-[12px] leading-snug line-clamp-2">
              {animation.desc || "Custom CSS animation."}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShareClick(animation);
            }}
            className="text-white/30 hover:text-white transition-colors shrink-0"
          >
            <Share2 size={15} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-white/10">
          <span className="text-[11px] font-medium text-white/50 truncate">
            {creator.name}
          </span>
          <div className="flex gap-3">
            {creator.github && (
              <a
                href={creator.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/30 hover:text-white transition-colors"
              >
                <FaGithub size={15} />
              </a>
            )}
            {creator.twitter && (
              <a
                href={creator.twitter}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/30 hover:text-white transition-colors"
              >
                <FaTwitter size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
