import { useState, useContext } from "react";
import Question from "./Question.jsx";
import QUIZ_QUESTIONS from "../questions.js";

import { QuizContext } from "./QuizContextProvider.jsx";

export default function Quiz() {
  const [isReady, setIsReady] = useState(false);
  const { answersState } = useContext(QuizContext)

  return (
    <div id="quiz">
      {/* {isReady ? (
        quizQuestions.map((question) => <Question question={question} key={question.id}/>)
      ) : (
        <button onClick={() => setIsReady(true)}>Press when ready...</button>
      )} */}

          {/* do testow, poki nie mam zaimplementowanej funkcji one-question-at-a-time */}

      {isReady ? (
          <Question question={QUIZ_QUESTIONS[answersState.questionNumber]} key={QUIZ_QUESTIONS[answersState.questionNumber].id} />
      ) : (
        <button onClick={() => setIsReady(true)}>Press when ready...</button>
      )}
    </div>
  );
}
