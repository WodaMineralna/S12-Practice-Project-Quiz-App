import { useState } from "react";
import Question from "./Question.jsx";
import QUIZ_QUESTIONS from "../questions.js";

export default function Quiz() {
  const [isReady, setIsReady] = useState(false);
  return (
    <div id="quiz">
      {isReady ? (
        QUIZ_QUESTIONS.map((question) => <Question question={question} />)
      ) : (
        <button onClick={() => setIsReady(true)}>Press when ready...</button>
      )}
    </div>
  );
}
