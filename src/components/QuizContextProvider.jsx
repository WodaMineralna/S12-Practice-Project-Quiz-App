import { createContext, useCallback, useReducer } from "react";

export const QuizContext = createContext({
  currentAnswer: "",
  answers: [],
  answerCorrection: "",
});

export default function QuizContextProvider({ children }) {
  function answerSelectionReducer(state, action) {
    if (action.type === "SUBMIT") {
      const selectedAnswers = {
        ...state,
        answers: [...state.answers, [action.payload, state.currentAnswer]],
        answerCorrection: "submitted",
      };

      return selectedAnswers;
    }
    // TODO w action.type === 'SELECT' dodaj checka sprawdzajacego czy jest to drugie klikniecie na ta sama odp, jezeli tak - 'SUBMIT'
    if (action.type === "SELECT") {
      return {
        ...state,
        currentAnswer: action.payload,
        answerCorrection: "selected",
      };
    }
  }

  const [answerSelectionState, answerSelectionDispatch] = useReducer(
    answerSelectionReducer,
    { currentAnswer: "", answers: [], answerCorrection: "" }
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

  const quizStateValue = {
    submitAnswer: handleSubmitAnswer,
    setSelectedAnswer: handleSetSelectedAnswer,
    answerState: answerSelectionState,
  };
  return (
    <QuizContext.Provider value={quizStateValue}>
      {children}
    </QuizContext.Provider>
  );
}
