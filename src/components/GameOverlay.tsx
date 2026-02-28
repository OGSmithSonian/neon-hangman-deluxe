import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, Skull, RotateCcw } from "lucide-react";
import type { GameStatus } from "@/hooks/useHangman";

interface GameOverlayProps {
  gameStatus: GameStatus;
  word: string;
  score: number;
  onNewGame: () => void;
}

export default function GameOverlay({ gameStatus, word, score, onNewGame }: GameOverlayProps) {
  if (gameStatus === "playing") return null;

  const won = gameStatus === "won";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-2xl"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex flex-col items-center gap-4 p-6 text-center"
        >
          <motion.div
            animate={{ rotate: won ? [0, -10, 10, -10, 0] : [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {won ? (
              <PartyPopper className="w-14 h-14 text-neon-green" style={{ filter: "drop-shadow(0 0 12px hsl(145 100% 50% / 0.6))" }} />
            ) : (
              <Skull className="w-14 h-14 text-destructive" style={{ filter: "drop-shadow(0 0 12px hsl(0 85% 55% / 0.6))" }} />
            )}
          </motion.div>

          <h2 className={`font-display text-2xl font-bold ${won ? "neon-text-green" : "text-destructive"}`}>
            {won ? "YOU WON!" : "GAME OVER"}
          </h2>

          {!won && (
            <p className="font-display text-lg neon-text-cyan tracking-widest">{word}</p>
          )}

          <p className="text-sm text-muted-foreground font-body">Score: {score}</p>

          <motion.button
            onClick={onNewGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-6 py-3 mt-2 rounded-lg font-display text-sm font-semibold
              border transition-all duration-200
              ${won 
                ? "border-neon-green/50 text-neon-green bg-neon-green/10 hover:bg-neon-green/20 neon-border-cyan" 
                : "border-neon-pink/50 text-neon-pink bg-neon-pink/10 hover:bg-neon-pink/20 neon-border-pink"
              }
            `}
            style={{ boxShadow: won 
              ? "0 0 15px hsl(145 100% 50% / 0.2)" 
              : "0 0 15px hsl(320 100% 60% / 0.2)" 
            }}
          >
            <RotateCcw className="w-4 h-4" />
            PLAY AGAIN
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
