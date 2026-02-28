import { Zap, Trophy, Flame } from "lucide-react";

interface GameHeaderProps {
  score: number;
  streak: number;
  bestStreak: number;
  wrongCount: number;
  maxWrong: number;
}

export default function GameHeader({ score, streak, bestStreak, wrongCount, maxWrong }: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full px-2">
      <div className="flex items-center gap-1.5">
        <Trophy className="w-4 h-4 text-neon-yellow" />
        <span className="font-display text-sm text-neon-yellow">{score}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {streak > 0 && (
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-neon-pink animate-pulse-glow" />
            <span className="font-display text-sm neon-text-pink">{streak}</span>
          </div>
        )}
        {bestStreak > 0 && (
          <div className="flex items-center gap-1 opacity-60">
            <span className="text-[10px] text-muted-foreground font-body">BEST</span>
            <span className="font-display text-xs text-muted-foreground">{bestStreak}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: maxWrong }).map((_, i) => (
          <Zap
            key={i}
            className={`w-3.5 h-3.5 transition-colors duration-300 ${
              i < maxWrong - wrongCount ? "text-neon-green" : "text-destructive/30"
            }`}
            fill={i < maxWrong - wrongCount ? "currentColor" : "none"}
          />
        ))}
      </div>
    </div>
  );
}
