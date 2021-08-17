import React from 'react'
import Questions from './questions/Questions'
import QuestionForm from './questions/QuestionForm'

export default function Home() {
  return (
    <div>
      <Questions isInsideQuestionRoute={false} />
    </div>
  )
}
