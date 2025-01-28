import { useState } from "react";
import Question from "./Question.jsx";
import QUIZ_QUESTIONS from "../questions.js";

export default function Quiz() {
  const [isReady, setIsReady] = useState(false);

  return (
    <div id="quiz">
      {/* {isReady ? (
        quizQuestions.map((question) => <Question question={question} key={question.id}/>)
      ) : (
        <button onClick={() => setIsReady(true)}>Press when ready...</button>
      )} */}

          {/* do testow, poki nie mam zaimplementowanej funkcji one-question-at-a-time */}

      {isReady ? (
          <Question question={QUIZ_QUESTIONS[0]} key={QUIZ_QUESTIONS[0].id} />
      ) : (
        <button onClick={() => setIsReady(true)}>Press when ready...</button>
      )}
    </div>
  );
}
