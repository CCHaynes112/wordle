import type { MouseEventHandler } from "react";
import type { GameState } from "../enums";

import "./EndGameScreen.css";
import WordleButton from "./WordleButton";

interface EndGameScreenProps {
  gameState: GameState;
  wordToGuess: string;
  onPlayAgain: MouseEventHandler<HTMLDivElement>;
}

export default function EndGameScreen(props: EndGameScreenProps) {
  return (
    <>
      <div>
        {props.gameState == "success" && <h1>You win!</h1>}
        {props.gameState == "failure" && (
          <>
            <h1>You lose!</h1>
            <h2>The word was {props.wordToGuess}</h2>
          </>
        )}
        {props.gameState != "inprogress" && (
          <WordleButton text="Play Again?" onSubmit={props.onPlayAgain} />
        )}
      </div>
    </>
  );
}
