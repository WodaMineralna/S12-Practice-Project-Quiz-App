import { createContext, useReducer, useState, useRef } from "react";

import { correctAnswers } from "../questions";

export const QuizContext = createContext({
  submitAnswer: () => {},
  setLockSelectedAnswer: () => {},
  setSelectedAnswer: () => {},
  setLastTry: () => {},
  answersState: {},
  addTimeout: () => {},
  clearTimeouts: () => {},
  TIMER_MS: Number,
});

export default function QuizContextProvider({ children }) {
  const STARTING_TIMER = 5000;
  const TIMER_FADEOUT = 2500;
  const [timerMS, setTimerMS] = useState(STARTING_TIMER);

  const timeouts = useRef([]);

  function handleAddTimeout(timeoutId) {
    timeouts.current.push(timeoutId);
  }

  function handleClearTimeouts() {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }

  function checkAnswerCorrection(questionId, usersAnswer) {
    // ^ check if user has submitted any answer
    if (!usersAnswer) return "skipped";

    // ^ get question from correctAnswers based on id
    const question = correctAnswers.find((item) => item.id === questionId);

    // ^ check if submitted answer matches questionIds answer
    const answerCorrection =
      question.answer === usersAnswer ? "correct" : "wrong";
    return answerCorrection;
  }

  function answerSelectionReducer(state, action) {
    if (action.type === "SUBMIT") {
      return {
        ...state,
        questionNumber: state.questionNumber + 1,
        answers: [
          ...state.answers,
          [
            action.payload, // questionId
            state.currentAnswer, // currentAnswer
            state.answerCorrection, // isAnswerCorrectOrWrong
          ],
        ],
        answerCorrection: "submitted",
        currentAnswer: "",
      };
    }

    if (action.type === "LOCK-ANSWER") {
      return {
        ...state,
        answerCorrection: checkAnswerCorrection(
          action.payload,
          state.currentAnswer
        ),
      };
    }

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
    {
      questionNumber: 0,
      currentAnswer: null,
      answers: [],
      answerCorrection: "",
    }
  );

  function handleSubmitAnswer(questionId) {
    handleClearTimeouts();
    setTimerMS(STARTING_TIMER);

    answerSelectionDispatch({
      type: "SUBMIT",
      payload: questionId,
    });
  }

  function handleLockSelectedAnswer(questionId) {
    setTimerMS(TIMER_FADEOUT);

    answerSelectionDispatch({
      type: "LOCK-ANSWER",
      payload: questionId,
    });

    setTimeout(() => handleSubmitAnswer(questionId), TIMER_FADEOUT);
  }

  function handleSetSelectedAnswer(clickedAnswer, questionId) {
    // ^ checks if answer has already been submitted / skipped - if so -> return, don't proceed
    if (
      ["wrong", "correct", "skipped"].includes(
        answerSelectionState.answerCorrection
      )
    )
      return;

    // ^ check if the same answer is clicked again - if so -> SUBMIT
    if (answerSelectionState.currentAnswer === clickedAnswer) {
      handleClearTimeouts();
      handleLockSelectedAnswer(questionId);
    } else {
      answerSelectionDispatch({
        type: "SELECT",
        payload: clickedAnswer,
      });
    }
  }

  function handleSetLastTry() {
    answerSelectionDispatch({
      type: "LAST_TRY",
    });
  }

  const quizStateValue = {
    submitAnswer: handleSubmitAnswer,
    lockSelectedAnswer: handleLockSelectedAnswer,
    setSelectedAnswer: handleSetSelectedAnswer,
    setLastTry: handleSetLastTry,
    answersState: answerSelectionState,
    addTimeout: handleAddTimeout,
    clearTimeouts: handleClearTimeouts,
    TIMER_MS: timerMS,
  };
  return (
    <QuizContext.Provider value={quizStateValue}>
      {children}
    </QuizContext.Provider>
  );
}
