import { useEffect, useContext } from "react";
import ProgressBar from "./ProgressBar";

import { QuizContext } from "./QuizContextProvider";

// DEBUGGING - normalny czas to bedzie z ~10000 - 20000ms

export default function Questions({ question }) {
  const {
    submitAnswer,
    lockSelectedAnswer,
    setSelectedAnswer,
    setLastTry,
    answersState,
    addTimeout,
    clearTimeouts,
    TIMER_MS,
  } = useContext(QuizContext);

  useEffect(() => {
    addTimeout(
      setTimeout(() => {
        setLastTry();
      }, TIMER_MS * 0.66)
    );

    addTimeout(
      setTimeout(() => {
        lockSelectedAnswer(question.id);
      }, TIMER_MS)
    );

    return clearTimeouts;
  }, []);

  return (
    <div id="question">
      <p id="question-overview">{question.text}</p>
      <ul id="answers">
        {question.answers.map((answer) => (
          <li className="answer" key={answer}>
            <button
              className={
                answersState.currentAnswer === answer
                  ? answersState.answerCorrection
                  : null
              }
              value={answer}
              onClick={(e) => setSelectedAnswer(e.target.value, question.id)}
            >
              {answer}
            </button>
          </li>
        ))}
        {/* testing */}
        <p>{JSON.stringify(answersState)}</p>
      </ul>
      <ProgressBar key={TIMER_MS} timer_ms={TIMER_MS} isLastTry={answersState.answerCorrection === 'last-try'} />
    </div>
  );
}
