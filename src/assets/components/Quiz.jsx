import { useState } from "react"
import Questions from "./Questions"

export default function Quiz() {
  const [isReady, setIsReady] = useState(false)
  return (
    <div id="quiz">
      {isReady ? <Questions /> : <button onClick={() => setIsReady(true)}>Press when ready...</button>}
    </div>
  )
}
