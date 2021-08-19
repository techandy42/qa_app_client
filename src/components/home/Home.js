import React from 'react'
import Questions from './questions/Questions'

export default function Home() {
  return (
    <div>
      <Questions isInsideQuestionRoute={false} />
    </div>
  )
}
