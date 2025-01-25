import { useState, useEffect } from "react";
import Question from "./Question.jsx";
import QUIZ_QUESTIONS from "../questions.js";

function shuffleQuestions(arr) {
  const shuffledQuestions = [...arr];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]]; // Swap elements
    }    
    return shuffledQuestions;
}

export default function Quiz() {
  const [isReady, setIsReady] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(QUIZ_QUESTIONS)

  useEffect(() => {
    setQuizQuestions(shuffleQuestions(QUIZ_QUESTIONS))
  }, [])

  return (
    <div id="quiz">
      {isReady ? (
        quizQuestions.map((question) => <Question question={question} key={question.id}/>)
      ) : (
        <button onClick={() => setIsReady(true)}>Press when ready...</button>
      )}
    </div>
  );
}
