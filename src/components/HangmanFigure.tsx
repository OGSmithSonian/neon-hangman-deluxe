import { motion } from "framer-motion";

interface HangmanFigureProps {
  wrongCount: number;
  gameStatus: "playing" | "won" | "lost";
}

const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const partVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 12 } },
};

export default function HangmanFigure({ wrongCount, gameStatus }: HangmanFigureProps) {
  const neonStroke = gameStatus === "lost" ? "hsl(0 85% 55%)" : "hsl(190 100% 50%)";
  const bodyStroke = gameStatus === "lost" ? "hsl(0 85% 55%)" : "hsl(320 100% 60%)";
  const glowFilter = gameStatus === "lost" ? "drop-shadow(0 0 6px hsl(0 85% 55%))" : "drop-shadow(0 0 6px hsl(190 100% 50%))";
  const bodyGlow = gameStatus === "lost" ? "drop-shadow(0 0 8px hsl(0 85% 55%))" : "drop-shadow(0 0 8px hsl(320 100% 60%))";

  return (
    <div className="relative flex items-center justify-center w-full max-w-[180px] mx-auto flex-1 min-h-0">
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: glowFilter }}>
        {/* Gallows */}
        <motion.line x1="30" y1="180" x2="170" y2="180" stroke={neonStroke} strokeWidth="3" strokeLinecap="round"
          variants={drawVariant} initial="visible" animate="visible" />
        <motion.line x1="60" y1="180" x2="60" y2="20" stroke={neonStroke} strokeWidth="3" strokeLinecap="round"
          initial="visible" animate="visible" />
        <motion.line x1="60" y1="20" x2="130" y2="20" stroke={neonStroke} strokeWidth="3" strokeLinecap="round"
          initial="visible" animate="visible" />
        <motion.line x1="130" y1="20" x2="130" y2="40" stroke={neonStroke} strokeWidth="3" strokeLinecap="round"
          initial="visible" animate="visible" />

        {/* Body parts */}
        <g style={{ filter: bodyGlow }}>
          {/* Head */}
          {wrongCount >= 1 && (
            <motion.circle cx="130" cy="55" r="15" fill="none" stroke={bodyStroke} strokeWidth="2.5"
              variants={partVariant} initial="hidden" animate="visible" />
          )}
          {/* Body */}
          {wrongCount >= 2 && (
            <motion.line x1="130" y1="70" x2="130" y2="115" stroke={bodyStroke} strokeWidth="2.5" strokeLinecap="round"
              variants={drawVariant} initial="hidden" animate="visible" />
          )}
          {/* Left arm */}
          {wrongCount >= 3 && (
            <motion.line x1="130" y1="82" x2="105" y2="100" stroke={bodyStroke} strokeWidth="2.5" strokeLinecap="round"
              variants={drawVariant} initial="hidden" animate="visible" />
          )}
          {/* Right arm */}
          {wrongCount >= 4 && (
            <motion.line x1="130" y1="82" x2="155" y2="100" stroke={bodyStroke} strokeWidth="2.5" strokeLinecap="round"
              variants={drawVariant} initial="hidden" animate="visible" />
          )}
          {/* Left leg */}
          {wrongCount >= 5 && (
            <motion.line x1="130" y1="115" x2="108" y2="145" stroke={bodyStroke} strokeWidth="2.5" strokeLinecap="round"
              variants={drawVariant} initial="hidden" animate="visible" />
          )}
          {/* Right leg */}
          {wrongCount >= 6 && (
            <motion.line x1="130" y1="115" x2="152" y2="145" stroke={bodyStroke} strokeWidth="2.5" strokeLinecap="round"
              variants={drawVariant} initial="hidden" animate="visible" />
          )}

          {/* Face when lost */}
          {gameStatus === "lost" && (
            <>
              <motion.text x="122" y="58" fontSize="8" fill={bodyStroke} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✕</motion.text>
              <motion.text x="132" y="58" fontSize="8" fill={bodyStroke} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✕</motion.text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
