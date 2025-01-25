
export default function Questions({ question }) {
  return (
        <div id="question">
          <p id="question-overview">{question.text}</p>
          <ul id="answers">
            {question.answers.map((answer) => (
              <li className="answer" key={answer}><button>{answer}</button></li>
            ))}
          </ul>
        </div>
  );
}
