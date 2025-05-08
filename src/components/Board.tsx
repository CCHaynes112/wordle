import { useEffect, useState } from "react";
import WordRow from "./WordRow";

import "./Board.css";
import type { GameState } from "../enums";
import EndGameScreen from "./EndGameScreen";
import { getRandomWord } from "../utils";

export default function Board() {
  const [gameState, setGameState] = useState<GameState>("inprogress");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [wordCurrentlyGuessing, setWordCurrentlyGuessing] = useState("");
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());

  const TOTAL_ROUNDS = 5;

  useEffect(() => {
    const handleGuess = () => {
      console.log("Handling guess...");
      setGuesses((prev) => [...prev, wordCurrentlyGuessing]);
      setWordCurrentlyGuessing("");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyInRegex = /^[a-zA-Z]$/.test(event.key);
      if (keyInRegex && wordCurrentlyGuessing.length < wordToGuess.length) {
        const userInput = event.key.toLowerCase();
        setWordCurrentlyGuessing(wordCurrentlyGuessing + userInput);
      } else if (event.key == "Backspace") {
        setWordCurrentlyGuessing(wordCurrentlyGuessing.slice(0, -1));
      } else if (event.key == "Enter") {
        if (wordCurrentlyGuessing.length == wordToGuess.length) handleGuess();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wordCurrentlyGuessing, wordToGuess.length]);

  useEffect(() => {
    if (guesses.includes(wordToGuess)) {
      setGameState("success");
    } else if (
      !guesses.includes(wordToGuess) &&
      guesses.length >= TOTAL_ROUNDS
    ) {
      setGameState("failure");
    }
  }, [guesses, wordToGuess]);

  const onPlayAgain = () => {
    setGameState("inprogress");
    setGuesses([]);
    setWordCurrentlyGuessing("");
    setWordToGuess(getRandomWord());
  };

  return (
    <>
      {gameState == "inprogress" && (
        <>
          <h1>Curtle</h1>
          <div className="board">
            {Array.from({ length: TOTAL_ROUNDS }).map((_, index) => (
              <WordRow
                key={index}
                wordToGuess={wordToGuess}
                wordCurrentlyGuessing={wordCurrentlyGuessing}
                guesses={guesses}
                active={index == guesses.length}
                rowIndex={index}
              />
            ))}
          </div>
        </>
      )}
      <EndGameScreen
        gameState={gameState}
        wordToGuess={wordToGuess}
        onPlayAgain={onPlayAgain}
      />
    </>
  );
}
