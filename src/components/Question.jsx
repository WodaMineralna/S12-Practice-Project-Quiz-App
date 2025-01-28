import { useEffect, useContext } from "react";
import ProgressBar from "./ProgressBar";

import { QuizContext } from "./QuizContextProvider";

const TIMER_MS = 5000;

export default function Questions({ question }) {
  const { submitAnswer, setSelectedAnswer, answerState } =
    useContext(QuizContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      submitAnswer(question.id);
    }, TIMER_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div id="question">
      <p id="question-overview">{question.text}</p>
      <ul id="answers">
        {question.answers.map((answer) => (
          <li className="answer" key={answer}>
            <button
              className={
                answerState.currentAnswer === answer
                  ? answerState.answerCorrection
                  : null
              }
              value={answer}
              onClick={(e) => setSelectedAnswer(e.target.value)}
            >
              {answer}
            </button>
          </li>
        ))}
        {/* testing */}
        <p>{JSON.stringify(answerState)}</p>
      </ul>
      <ProgressBar timer_ms={TIMER_MS} />
    </div>
  );
}
