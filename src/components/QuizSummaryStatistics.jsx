import { useContext } from "react";
import { QuizContext } from "./QuizContextProvider";

let statPercentageRoundingCompensation = 100;

export default function QuizSummaryStatistics() {
  const { answersState } = useContext(QuizContext);

  function calculateStatistics(answerStatus) {
    const stat = answersState.answers.filter(
      (el) => el[2] === answerStatus
    ).length;

    const statPercentage = Math.floor((100 / 7) * stat);
    statPercentageRoundingCompensation -= statPercentage;

    if (statPercentageRoundingCompensation <= 3 && stat !== 0)
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
