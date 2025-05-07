import LetterBox from "./LetterBox";
import "./WordRow.css";

interface WordRowProps {
  wordToGuess: string;
  guesses: string[];
  active: boolean;
  wordCurrentlyGuessing: string;
  rowIndex: number;
}

export default function WordRow(props: WordRowProps) {
  
  const getGuessedLetter = (index: number) => {
    // If we have a guess at current rowIndex, then show it
    if (props.guesses.length > props.rowIndex) {
      return props.guesses[props.rowIndex][index]
    }
    // If we don't have a guess at current rowIndex, but we're active, pass it
    else if (props.active) {
      return props.wordCurrentlyGuessing[index]
    }
  }

  const getLetterBoxRow = (index: number) => {
    return (
      <LetterBox
        key={index}
        rowIndex={props.rowIndex}
        colIndex={index}
        wordToGuess={props.wordToGuess}
        guessedLetter={getGuessedLetter(index)}
        guesses={props.guesses}
      />
    )
  }

  return (
    <div className="word-row">
      {Array.from({ length: props.wordToGuess.length }).map((_, index) => {
        return getLetterBoxRow(index)
      })}
    </div>
  );
}
