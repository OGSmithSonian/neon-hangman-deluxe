import { useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Tag } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
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
    <div className="h-[100dvh] flex flex-col items-center bg-background overflow-hidden relative">
      <ParticlesBackground />
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-xl sm:text-3xl font-black tracking-wider neon-text-cyan mt-2 sm:mt-4 animate-flicker select-none shrink-0"
      >
        HANGMAN
      </motion.h1>

      {/* Game container */}
      <div className="relative flex flex-col items-center w-full max-w-lg flex-1 min-h-0 px-4 pt-2 pb-3 gap-2 sm:gap-3">
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
          className="flex-1 min-h-0 flex items-center justify-center w-full"
        >
          <HangmanFigure wrongCount={game.wrongCount} gameStatus={game.gameStatus} />
        </motion.div>

        {/* Category & Hint */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-neon-purple" />
            <span className="font-display text-[10px] tracking-widest neon-text-purple uppercase">{game.category}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-muted/50 border border-border">
            <Lightbulb className="w-3 h-3 text-neon-yellow" />
            <span className="text-[11px] text-muted-foreground font-body">{game.hint}</span>
          </div>
        </div>

        {/* Word */}
        <WordDisplay word={game.word} guessedLetters={game.guessedLetters} gameStatus={game.gameStatus} />

        {/* Keyboard */}
        <div className="w-full shrink-0">
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
