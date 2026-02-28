import { useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Tag } from "lucide-react";
import { useHangman } from "@/hooks/useHangman";
import HangmanFigure from "@/components/HangmanFigure";
import WordDisplay from "@/components/WordDisplay";
import Keyboard from "@/components/Keyboard";
import GameHeader from "@/components/GameHeader";
import GameOverlay from "@/components/GameOverlay";

const Index = () => {
  const game = useHangman();

  // Keyboard input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        game.guessLetter(letter);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [game.guessLetter]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center bg-background neon-bg-grid neon-scanline">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl sm:text-3xl font-black tracking-wider neon-text-cyan mt-4 sm:mt-6 animate-flicker select-none"
      >
        HANGMAN
      </motion.h1>

      {/* Game container */}
      <div className="relative flex flex-col items-center w-full max-w-lg flex-1 px-4 pt-3 pb-4 gap-4 sm:gap-5">
        <GameHeader
          score={game.score}
          streak={game.streak}
          bestStreak={game.bestStreak}
          wrongCount={game.wrongCount}
          maxWrong={game.maxWrong}
        />

        {/* Figure */}
        <motion.div
          key={game.wrongCount}
          animate={game.wrongCount > 0 && !game.word.includes([...game.guessedLetters].at(-1) || "") ? { x: [-3, 3, -3, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <HangmanFigure wrongCount={game.wrongCount} gameStatus={game.gameStatus} />
        </motion.div>

        {/* Category & Hint */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-neon-purple" />
            <span className="font-display text-[11px] tracking-widest neon-text-purple uppercase">{game.category}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border">
            <Lightbulb className="w-3.5 h-3.5 text-neon-yellow" />
            <span className="text-xs text-muted-foreground font-body">{game.hint}</span>
          </div>
        </div>

        {/* Word */}
        <WordDisplay word={game.word} guessedLetters={game.guessedLetters} gameStatus={game.gameStatus} />

        {/* Keyboard */}
        <div className="mt-auto w-full pb-2">
          <Keyboard
            word={game.word}
            guessedLetters={game.guessedLetters}
            gameStatus={game.gameStatus}
            onGuess={game.guessLetter}
          />
        </div>

        {/* Overlay */}
        <GameOverlay
          gameStatus={game.gameStatus}
          word={game.word}
          score={game.score}
          onNewGame={game.newGame}
        />
      </div>
    </div>
  );
};

export default Index;
