import { useContext } from "react";
import { QuizContext } from "./QuizContextProvider";

export default function QuizSummaryStatistics() {
  const { answersState } = useContext(QuizContext);

  let statPercentageRoundingCompensation = 100;
  function calculateStatistics(answerStatus) {
    const stat = answersState.answers.filter(
      (el) => el[2] === answerStatus
    ).length;

    const statPercentage = Math.floor((100 / 7) * stat);
    statPercentageRoundingCompensation -= statPercentage;

    if (
      statPercentageRoundingCompensation < 5 &&
      statPercentageRoundingCompensation > 0
    )
      return statPercentage + statPercentageRoundingCompensation + "%";
    else return statPercentage + "%";
  }

  return (
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
  );
}
