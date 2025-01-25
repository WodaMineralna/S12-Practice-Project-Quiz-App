import { useState, useEffect, useCallback } from "react";
import ProgressBar from "./ProgressBar";

const TIMER_MS = 10000;

export default function Questions({ question }) {
  const [selectedAnswer, setSelectedAnswer] = useState();
  // TODO wpierdol tu useReducera() na rozne eventy --> wybranie odpowiedzi / drugi klik na odpowiedz / time run out
  // FIX click w buttona opoznia console.log('ttt')?? idk why --> wpierw sie konczy interval, a dopiero po chwilce jest 'ttt'
  
  // ? useCallback needed?
  const submitAnswer = useCallback(function submitAnswer() {
    console.log("ttt");
  })
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      submitAnswer()
    }, TIMER_MS);

    return () => {
      clearTimeout(timeout);
    };

    // FIX po kliknieciu ponownym, caly ten useEffect sie ponawia - ROZBUDUJ ^^[useReducer], FIX
  }, [submitAnswer]);

  function handleSetSelectedAnswer(ans) {
    setSelectedAnswer(ans);
  }


  return (
    <div id="question">
      <p id="question-overview">{question.text}</p>
      <ul id="answers">
        {question.answers.map((answer) => (
          <li className="answer" key={answer}>
            <button
              value={answer}
              onClick={(e) => handleSetSelectedAnswer(e.target.value)}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <ProgressBar timer_ms={TIMER_MS} />
    </div>
  );
}
