import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PROFILE } from '../../../constants/storageKeys'
import Question from './question/Question'
import { Link } from 'react-router-dom'

export default function Questions({ isInsideQuestionRoute, questionId }) {
  const questions = useSelector((state) => state.questions)

  //the filtering should in the future be done at mongoose
  return (
    <div>
      {isInsideQuestionRoute ? (
        <>
          {questions
            .filter((question) => question._id !== questionId)
            .map((question) => {
              return (
                <div>
                  <Link to={`/${question._id}`}>
                    <Question question={question} />
                  </Link>
                </div>
              )
            })}
        </>
      ) : (
        <>
          {questions.map((question) => {
            return (
              <div>
                <Link to={`/${question._id}`}>
                  <Question question={question} />
                </Link>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
