import trophyPic from "../assets/quiz-complete.png";
import QuizSummaryStatistics from "./QuizSummaryStatistics";
import QuizSummaryAnswers from "./QuizSummaryAnswers";

export default function QuizSummary() {
  return (
    <>
      <div id="summary">
        <img src={trophyPic} alt="Quiz finish trophy picture" />
        <h2>QUIZ COMPLETED!</h2>

        <QuizSummaryStatistics />
        <QuizSummaryAnswers />
      </div>
    </>
  );
}
