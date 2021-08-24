import React from 'react'
import { useSelector } from 'react-redux'
import Question from './question/Question'

export default function Questions({ isInsideQuestionRoute, questionId }) {
  const questions = useSelector((state) => state.questions)

  return (
    <div>
      {isInsideQuestionRoute ? (
        <>
          {questions
            .filter((question) => question._id !== questionId)
            .map((question) => {
              return (
                <div className="container-question">
                  <Question question={question} />
                </div>
              )
            })}
        </>
      ) : (
        <>
          {questions.map((question) => {
            return (
              <div className="container-question">
                <Question question={question} />
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
