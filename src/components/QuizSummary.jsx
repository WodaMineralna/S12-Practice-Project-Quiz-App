import trophyPic from "../assets/quiz-complete.png";
import { questions, correctQuestions } from "../questions";

import { useContext } from "react";
import { QuizContext } from "./QuizContextProvider";

export default function QuizSummary() {
  const { answersState } = useContext(QuizContext);

  // * ZMERGUJ TE DWIE FUNKCJE

  // TODO zmien nazwe klasy, so it matches better
  function findQuestionFromId(questionId) {
    const question = questions.find((item) => item.id === questionId);
    return question ? question.text : null;
  }

  function findCorrectAnswerFromId(questionId) {
    const question = correctQuestions.find((item) => item.id === questionId);
    return question ? question.answer : null;
  }


  // ? doesnt sum up to 100% przez zaokragkenia xdd
  function calculateStatistics(answerStatus) {
    const stat = answersState.answers.filter(
      (el) => el[2] === answerStatus
    ).length;
    const statPercentage = Math.floor((100 / 7) * stat);

    return statPercentage + "%";
  }

  // TODO 'view-answers' button, tak jak na main page z 'ready-button'
  return (
    <>
      <p>{JSON.stringify(answersState)}</p>
      <div id="summary">
        <img src={trophyPic} alt="Quiz finish trophy picture" />
        <h2>QUIZ COMPLETED!</h2>

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
            <li key={index}>
              <h3>{index + 1}</h3>
              <div className="question">{findQuestionFromId(answer[0])}</div>
              <div className={`user-answer ${answer[2]}`}>{answer[1]}</div>
              {/* // TODO wpierdol to do oddzielnej funckji */}
              {answer[2] === "wrong" ? (
                <div className="user-answer correctedAnswer">
                  {findCorrectAnswerFromId(answer[0])}
                </div>
              ) : answer[2] === "skipped" ? (
                <div className="user-answer skipped">
                  {findCorrectAnswerFromId(answer[0])}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
