import "./LetterBox.css";

interface LetterBoxProps {
  guesses: string[];
  rowIndex: number;
  colIndex: number;
  wordToGuess: string;
  guessedLetter?: string;
}

export default function LetterBox(props: LetterBoxProps) {

  const getClassNames = () => {
    if (props.guesses.length > props.rowIndex) {
      if (props.wordToGuess[props.colIndex] == props.guesses[props.rowIndex][props.colIndex]) {
        return "letter-box letter-box-full-match"
      } else if (props.wordToGuess.includes(props.guesses[props.rowIndex][props.colIndex])) {
        return "letter-box letter-box-wrong-location"
      } else {
        return "letter-box letter-box-full-wrong"
      }
    }
    return "letter-box"
  }

  return <div className={getClassNames()}>{props.guessedLetter && props.guessedLetter.toUpperCase()}</div>;
}
