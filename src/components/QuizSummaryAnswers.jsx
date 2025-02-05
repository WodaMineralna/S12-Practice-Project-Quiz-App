import { useContext } from "react";
import { QuizContext } from "./QuizContextProvider";

import QUIZ_QUESTIONS, { correctAnswers } from "../questions";

export default function QuizSummaryAnswers() {
  const { answersState } = useContext(QuizContext);

  function findElementFromId(questionId, elementToLookFor, answerCorrection) {
    let arrayToLookFor = "";
    let keyToLookFor = "";
    let styles = "";

    if (elementToLookFor === "correctAnswer") {
      if (answerCorrection === "correct") return;

      arrayToLookFor = correctAnswers;
      keyToLookFor = "answer";

      if (answerCorrection === "wrong") {
        styles = "user-answer correctedAnswer";
      } else if (answerCorrection === "skipped") {
        styles = "user-answer skippedAnswer";
      }
    }

    if (elementToLookFor === "questionText") {
      arrayToLookFor = QUIZ_QUESTIONS;
      keyToLookFor = "text";
      styles = "question";
    }

    const question = arrayToLookFor.find((item) => item.id === questionId);
    return (
      <div className={styles}>{question ? question[keyToLookFor] : null}</div>
    );
  }

  return (
    <ol>
      {answersState.answers.map((answer, index) => (
        <li key={index}>
          <h3>{index + 1}</h3>
          {findElementFromId(answer[0], "questionText")}
          <div className={`user-answer ${answer[2]}`}>
            {answer?.[1] || "No answer submitted..."}
          </div>
          {findElementFromId(answer[0], "correctAnswer", answer[2])}
        </li>
      ))}
    </ol>
  );
}
