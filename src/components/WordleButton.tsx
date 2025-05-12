import type { MouseEventHandler } from "react";
import './WordleButton.css'

interface WordleButtonProps {
  onSubmit: MouseEventHandler<HTMLDivElement>;
  text: string;
}

export default function WordleButton(props: WordleButtonProps) {
  return (
    <div className="button" onClick={props.onSubmit}>
      <h3>{props.text}</h3>
    </div>
  );
}
