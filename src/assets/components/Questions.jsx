import QUIZ_QUESTIONS from '../questions.js'

export default function Questions() {
  return (
    <div>
      {QUIZ_QUESTIONS.map(question => <p>{JSON.stringify(question)}</p>)}
    </div>
  )
}
