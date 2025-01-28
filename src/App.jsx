import Header from "./components/Header";
import Quiz from "./components/Quiz";
import QuizContextProvider from "./components/QuizContextProvider";

function App() {
  return (
    <QuizContextProvider>
      <Header />
      <Quiz />
    </QuizContextProvider>
  );
}

export default App;
