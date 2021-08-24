import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ANSWER } from '../../../constants/postTypes'
import { DEFAULT } from '../../../constants/themeTypes'
import UpvotePost from '../votePost/UpvotePost'
import DownvotePost from '../votePost/DownvotePost'
import { deleteAnswer } from '../../../actions/answerActions'
import AnswerUpdateSections from './AnswerSections/AnswerUpdateSections'
import AnswerSections from './AnswerSections/AnswerSections'
import { useHistory, useLocation } from 'react-router-dom'
import { SET_ACCOUNT_USER } from '../../../constants/actionTypes'

export default function Answers() {
  const answers = useSelector((state) => state.answers)
  const user = useSelector((state) => state.user)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const accountUser = useSelector((state) => state.user)

  useEffect(() => {
    setSelectedAnswer(null)
  }, [location])

  const goToAccountUser = (answer) => {
    if (answer?.creator === (user?.profile?.googleId || user?.profile?._id)) {
      history.push('/account')
    } else {
      dispatch({
        type: SET_ACCOUNT_USER,
        payload: { userId: answer?.creator, name: answer.name, imageUrl: answer?.imageUrl, theme: answer?.theme },
      })
      history.push('/accountUser')
    }
  }

  return (
    <div className="container-answers">
      {answers.map((answer) => {
        return (
          <div className="container-answer-complete">
            <button className="btn-user" onClick={() => goToAccountUser(answer)}>
              {answer?.imageUrl ? (
                <>
                  <img className="img-user" src={answer?.imageUrl} />
                </>
              ) : (
                <>
                  <div className="theme-user" style={{ backgroundColor: answer?.theme ? answer?.theme : DEFAULT }}>
                    {answer.name[0]}
                  </div>
                </>
              )}
            </button>
            <p className="name">{answer.name}</p>
            {selectedAnswer?._id === answer._id ? (
              <>
                <AnswerUpdateSections selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
              </>
            ) : (
              <>
                <AnswerSections answer={answer} />
              </>
            )}
            <UpvotePost post={answer} type={ANSWER} />
            <DownvotePost post={answer} type={ANSWER} />
            {(user?.profile?.googleId || user?.profile?._id) === answer?.creator && (
              <div className="container-btn-answer-control">
                {selectedAnswer?._id !== answer._id && (
                  <button className="btn-answer-control" onClick={() => setSelectedAnswer(answer)}>
                    Edit
                  </button>
                )}
                <button className="btn-answer-control" onClick={() => dispatch(deleteAnswer(answer._id))}>
                  Delete
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
