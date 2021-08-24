import React from 'react'
import Questions from './questions/Questions'

export default function Home() {
  return (
    <div className="container-body">
      <Questions isInsideQuestionRoute={false} />
    </div>
  )
}
