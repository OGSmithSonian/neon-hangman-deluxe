import { motion } from "framer-motion";
import type { GameStatus } from "@/hooks/useHangman";

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  gameStatus: GameStatus;
}

export default function WordDisplay({ word, guessedLetters, gameStatus }: WordDisplayProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
      {[...word].map((letter, i) => {
        const revealed = guessedLetters.has(letter);
        const showLetter = revealed || gameStatus === "lost";

        return (
          <motion.div
            key={`${letter}-${i}`}
            className={`
              relative w-9 h-12 sm:w-11 sm:h-14 flex items-center justify-center
              border-b-2 font-display text-xl sm:text-2xl font-bold
              ${revealed ? "border-neon-cyan neon-text-cyan" : 
                gameStatus === "lost" ? "border-destructive text-destructive" : 
                "border-muted-foreground"}
            `}
            initial={showLetter && !revealed ? { rotateX: 90 } : {}}
            animate={showLetter ? { rotateX: 0 } : {}}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            {showLetter && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.2 }}
              >
                {letter}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
