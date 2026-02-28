import { motion } from "framer-motion";
import type { GameStatus } from "@/hooks/useHangman";

interface KeyboardProps {
  word: string;
  guessedLetters: Set<string>;
  gameStatus: GameStatus;
  onGuess: (letter: string) => boolean;
}

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  "ZXCVBNM".split(""),
];

export default function Keyboard({ word, guessedLetters, gameStatus, onGuess }: KeyboardProps) {
  const getKeyState = (letter: string) => {
    if (!guessedLetters.has(letter)) return "unused";
    return word.includes(letter) ? "correct" : "wrong";
  };

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 w-full max-w-md mx-auto px-1">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1 sm:gap-1.5 justify-center w-full">
          {row.map((letter) => {
            const state = getKeyState(letter);
            return (
              <motion.button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={state !== "unused" || gameStatus !== "playing"}
                whileTap={state === "unused" && gameStatus === "playing" ? { scale: 0.85 } : {}}
                whileHover={state === "unused" && gameStatus === "playing" ? { scale: 1.1 } : {}}
                className={`
                  relative flex items-center justify-center
                  w-[9vw] h-[11vw] max-w-[36px] max-h-[44px] sm:w-9 sm:h-11
                  rounded-md font-display text-xs sm:text-sm font-semibold
                  transition-all duration-200 select-none
                  ${state === "unused" 
                    ? "bg-muted text-foreground border border-border hover:neon-border-cyan hover:neon-text-cyan" 
                    : state === "correct"
                    ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 neon-text-cyan"
                    : "bg-destructive/20 text-destructive/50 border border-destructive/30"
                  }
                  disabled:cursor-default
                `}
              >
                {letter}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
