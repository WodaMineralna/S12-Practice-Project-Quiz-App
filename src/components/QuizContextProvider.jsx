import { createContext, useCallback, useReducer } from "react";

import { correctQuestions } from "../questions";

export const QuizContext = createContext({
  submitAnswer: () => {},
  setSelectedAnswer: () => {},
  setLastTry: () => {},
  answersState: {},
});

export default function QuizContextProvider({ children }) {
  function checkAnswerCorrection(questionId, usersAnswer) {
    // ^ get question from correctQuestions based on id
    const question = correctQuestions.find((item) => item.id === questionId);

    // ^ check if submitted answer matches questionIds answer
    const answerCorrection =
      question.answer === usersAnswer ? "correct" : "wrong";
    return answerCorrection;
  }

  function answerSelectionReducer(state, action) {
    if (action.type === "SUBMIT") {
      const selectedAnswers = {
        ...state,
        questionNumber: state.questionNumber + 1,
        // TODO   przerob answers na object oraz wypierdol .answerCorrection (dodaj do objectu)
        answers: [
          ...state.answers,
          [
            action.payload, // questionId
            state.currentAnswer, // currentAnswer
            checkAnswerCorrection(action.payload, state.currentAnswer), // isAnswerCorrectOrWrong
          ],
        ],
        answerCorrection: "submitted",
        currentAnswer: "",
      };

      return selectedAnswers;
    }
    // TODO w action.type === 'SELECT' dodaj checka sprawdzajacego czy jest to drugie klikniecie na ta sama odp, jezeli tak - 'SUBMIT'
    if (action.type === "SELECT") {
      return {
        ...state,
        currentAnswer: action.payload,
        answerCorrection:
          state.answerCorrection === "last-try" ? "last-try" : "selected",
      };
    }

    if (action.type === "LAST_TRY") {
      return {
        ...state,
        answerCorrection: "last-try",
      };
    }
  }

  const [answerSelectionState, answerSelectionDispatch] = useReducer(
    answerSelectionReducer,
    { questionNumber: 0, currentAnswer: "", answers: [], answerCorrection: "" }
  );

  // ? useCallback needed?
  const handleSubmitAnswer = useCallback(function handleSubmitAnswer(
    questionId
  ) {
    answerSelectionDispatch({
      type: "SUBMIT",
      payload: questionId,
    });
  });

  function handleSetSelectedAnswer(clickedAnswer) {
    answerSelectionDispatch({
      type: "SELECT",
      payload: clickedAnswer,
    });
  }

  function handleSetLastTry() {
    answerSelectionDispatch({
      type: "LAST_TRY",
    });
  }

  const quizStateValue = {
    submitAnswer: handleSubmitAnswer,
    setSelectedAnswer: handleSetSelectedAnswer,
    setLastTry: handleSetLastTry,
    answersState: answerSelectionState,
  };
  return (
    <QuizContext.Provider value={quizStateValue}>
      {children}
    </QuizContext.Provider>
  );
}
