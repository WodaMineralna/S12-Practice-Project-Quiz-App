import { useState, useContext } from "react";
import Question from "./Question.jsx";
import QUIZ_QUESTIONS from "../questions.js";
import QuizSummary from "./QuizSummary.jsx";

import { QuizContext } from "./QuizContextProvider.jsx";

export default function Quiz() {
  const [isReady, setIsReady] = useState(false);
  const { answersState } = useContext(QuizContext);

  return (
    <div id="quiz">
      {isReady ? (
        answersState.questionNumber < 7 ? (
          <Question
            question={QUIZ_QUESTIONS[answersState.questionNumber]}
            key={QUIZ_QUESTIONS[answersState.questionNumber].id}
          />
        ) : (
          <QuizSummary />
        )
      ) : (
        <button className="ready" onClick={() => setIsReady(true)}>
          Press when ready...
        </button>
      )}
    </div>
  );
}
