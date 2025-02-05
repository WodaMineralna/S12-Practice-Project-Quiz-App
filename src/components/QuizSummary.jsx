import trophyPic from "../assets/quiz-complete.png";
import QUIZ_QUESTIONS, { correctAnswers } from "../questions";

import { useContext } from "react";
import { QuizContext } from "./QuizContextProvider";

export default function QuizSummary() {
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

  // ? doesnt sum up to 100% przez zaokragkenia xdd
  function calculateStatistics(answerStatus) {
    const stat = answersState.answers.filter(
      (el) => el[2] === answerStatus
    ).length;
    const statPercentage = Math.floor((100 / 7) * stat);

    return statPercentage + "%";
  }

  return (
    <>
      <p>{JSON.stringify(answersState)}</p>
      <div id="summary">
        <img src={trophyPic} alt="Quiz finish trophy picture" />
        <h2>QUIZ COMPLETED!</h2>

        {/* // TODO wrzuc to do oddzielnego componentu */}
        <div id="summary-stats">
          <p>
            <span className="number">{calculateStatistics("skipped")}</span>
            <span className="text skipped">SKIPPED</span>
          </p>
          <p>
            <span className="number">{calculateStatistics("correct")}</span>
            <span className="text correct">ANSWERED CORRECTLY</span>
          </p>
          <p>
            <span className="number">{calculateStatistics("wrong")}</span>
            <span className="text wrong">ANSWERED INCORRECTLY</span>
          </p>
        </div>

        <ol>
          {answersState.answers.map((answer, index) => (
            // TODO wrzuc to do oddzielnego componentu
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
      </div>
    </>
  );
}
