import { wordList } from "./consts";

export const getRandomWord = () => {
    const randomNumber = Math.random() * (wordList.length - 0) + 0;
    return wordList[randomNumber];
  };