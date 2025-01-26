import { useEffect, useCallback, useReducer } from "react";
import ProgressBar from "./ProgressBar";

const TIMER_MS = 5000;

function answerSelectionReducer(state, action) {
  if (action.type === "SUBMIT") {
    const selectedAnswers = {...state, answers: [...state.answers, ["TODO-id", state.currentAnswer]]}

    return selectedAnswers;
  }
  // TODO w action.type === 'SELECT' dodaj checka sprawdzajacego czy jest to drugie klikniecie na ta sama odp, jezeli tak - 'SUBMIT'
  if (action.type === "SELECT") {
    return { ...state, currentAnswer: action.payload };
  }
}

export default function Questions({ question }) {
  const [answerSelectionState, answerSelectionDispatch] = useReducer(
    answerSelectionReducer,
    { currentAnswer: "", answers: [] }
  );

  // ? useCallback needed?
  const submitAnswer = useCallback(function submitAnswer() {
    answerSelectionDispatch({
      type: "SUBMIT",
      payload: null,
    });
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      submitAnswer();
    }, TIMER_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function handleSetSelectedAnswer(clickedAnswer) {
    answerSelectionDispatch({
      type: "SELECT",
      payload: clickedAnswer,
    });
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
        <p>{JSON.stringify(answerSelectionState)}</p>
      </ul>
      <ProgressBar timer_ms={TIMER_MS} />
    </div>
  );
}
