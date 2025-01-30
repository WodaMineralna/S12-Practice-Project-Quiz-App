import trophyPic from "../assets/quiz-complete.png";
import { questions } from "../questions";

import { useContext } from "react";
import { QuizContext } from "./QuizContextProvider";

export default function QuizSummary() {
  const { answersState } = useContext(QuizContext);

  // TODO zmien nazwe klasy, so it matches better
  function findQuestionFromId(questionId) {
    const question = questions.find((item) => item.id === questionId);
    return question ? question.text : null;
  }

  function deriveAnswerCorrectionClassname(answerCorrection) {
    return answerCorrection === 'correct' ? 'correct' : 'wrong'
  }

  // TODO 'view-answers' button, tak jak na main page z 'ready-button'

  return (
    <>
      <p>{JSON.stringify(answersState)}</p>
      <div id="summary">
        <img src={trophyPic} alt="Quiz finish trophy picture" />
        <h2>QUIZ COMPLETED!</h2>

        {/* // TODO summary-stats niech bedzie liczone w jakiejs funkcji, wypluwane potem tutaj */}
        <div id="summary-stats">
          <p>
            <span className="number">X%</span>
            <span className="text">SKIPPED</span>
          </p>
          <p>
            <span className="number">X%</span>
            <span className="text">ANSWERED CORRECTLY</span>
          </p>
          <p>
            <span className="number">X%</span>
            <span className="text">ANSWERED INCORRECTLY</span>
          </p>
        </div>

        {/* // TODO <ol> z odpowiedziami */}
        <ol>
          {answersState.answers.map((answer, index) => (
            <li key={index}>
              <h3>{index + 1}</h3>
              <div className="question">{findQuestionFromId(answer[0])}</div>
              <div className={`user-answer ${(answer[2])}`}>{answer[1]}</div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
