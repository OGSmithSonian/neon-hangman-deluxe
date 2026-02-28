import { useState, useCallback, useEffect } from "react";

const WORD_LIST: { word: string; hint: string; category: string }[] = [
  { word: "QUANTUM", hint: "Smallest unit in physics", category: "Science" },
  { word: "NEBULA", hint: "Cloud of gas in space", category: "Space" },
  { word: "CIPHER", hint: "Secret code system", category: "Tech" },
  { word: "PHOENIX", hint: "Mythical bird reborn from ashes", category: "Mythology" },
  { word: "VORTEX", hint: "Spinning mass of fluid", category: "Nature" },
  { word: "MATRIX", hint: "Rectangular array of numbers", category: "Math" },
  { word: "ECLIPSE", hint: "When one celestial body obscures another", category: "Space" },
  { word: "DRAGON", hint: "Fire-breathing legendary creature", category: "Mythology" },
  { word: "BINARY", hint: "System of ones and zeros", category: "Tech" },
  { word: "COSMOS", hint: "The universe as a whole", category: "Space" },
  { word: "PLASMA", hint: "Fourth state of matter", category: "Science" },
  { word: "GLACIER", hint: "Slow-moving river of ice", category: "Nature" },
  { word: "PARADOX", hint: "A self-contradictory statement", category: "Logic" },
  { word: "SPHINX", hint: "Mythical creature with lion body", category: "Mythology" },
  { word: "PRISM", hint: "Splits white light into colors", category: "Science" },
  { word: "AURORA", hint: "Northern lights phenomenon", category: "Nature" },
  { word: "ZENITH", hint: "The highest point", category: "Space" },
  { word: "ALCHEMY", hint: "Medieval chemistry", category: "Science" },
  { word: "CRYPTO", hint: "Encrypted digital currency", category: "Tech" },
  { word: "TSUNAMI", hint: "Giant ocean wave", category: "Nature" },
  { word: "HYDRA", hint: "Multi-headed serpent", category: "Mythology" },
  { word: "PHOTON", hint: "Particle of light", category: "Science" },
  { word: "NEON", hint: "Noble gas used in signs", category: "Science" },
  { word: "PIXEL", hint: "Smallest unit of a digital image", category: "Tech" },
  { word: "RAVEN", hint: "Intelligent black bird", category: "Nature" },
];

const MAX_WRONG = 6;

export type GameStatus = "playing" | "won" | "lost";

export function useHangman() {
  const [currentWordData, setCurrentWordData] = useState(() => 
    WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => {
    const saved = localStorage.getItem("hangman-best-streak");
    return saved ? parseInt(saved, 10) : 0;
  });

  const word = currentWordData.word;
  const hint = currentWordData.hint;
  const category = currentWordData.category;

  const wrongGuesses = [...guessedLetters].filter((l) => !word.includes(l));
  const wrongCount = wrongGuesses.length;
  const revealedLetters = [...word].filter((l) => guessedLetters.has(l));

  const gameStatus: GameStatus =
    wrongCount >= MAX_WRONG
      ? "lost"
      : [...word].every((l) => guessedLetters.has(l))
      ? "won"
      : "playing";

  useEffect(() => {
    if (gameStatus === "won") {
      const points = Math.max(10, (MAX_WRONG - wrongCount) * 15);
      setScore((s) => s + points);
      setStreak((s) => {
        const newStreak = s + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
          localStorage.setItem("hangman-best-streak", String(newStreak));
        }
        return newStreak;
      });
    } else if (gameStatus === "lost") {
      setStreak(0);
    }
  }, [gameStatus]);

  const guessLetter = useCallback(
    (letter: string) => {
      if (gameStatus !== "playing" || guessedLetters.has(letter)) return false;
      setGuessedLetters((prev) => new Set([...prev, letter]));
      return word.includes(letter);
    },
    [gameStatus, guessedLetters, word]
  );

  const newGame = useCallback(() => {
    let next = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    while (next.word === word && WORD_LIST.length > 1) {
      next = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    }
    setCurrentWordData(next);
    setGuessedLetters(new Set());
  }, [word]);

  return {
    word,
    hint,
    category,
    guessedLetters,
    wrongCount,
    wrongGuesses,
    maxWrong: MAX_WRONG,
    gameStatus,
    score,
    streak,
    bestStreak,
    guessLetter,
    newGame,
  };
}
