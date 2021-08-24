import React, { useEffect } from 'react'
import moment from 'moment'
import Questions from './Questions'
import UpvotePost from '../votePost/UpvotePost'
import DownvotePost from '../votePost/DownvotePost'
import { QUESTION } from '../../../constants/postTypes'
import AnswerForm from '../answers/AnswerForm'
import { useDispatch, useSelector } from 'react-redux'
import Answers from '../answers/Answers'
import { getAnswers } from '../../../actions/answerActions'
import { useHistory } from 'react-router-dom'
import { SET_ACCOUNT_USER } from '../../../constants/actionTypes'

export default function QuestionRoute({ question }) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getAnswers(question._id))
  }, [question])

  const goToAccountUser = () => {
    if (question?.creator === (user?.profile?.googleId || user?.profile?._id)) {
      history.push('/account')
    } else {
      dispatch({
        type: SET_ACCOUNT_USER,
        payload: { userId: question?.creator, name: question.name, imageUrl: question?.imageUrl, theme: question?.theme },
      })
      history.push('/accountUser')
    }
  }

  return (
    <div className="container-body">
      <div className="container-question-route">
        <div className="container-user-info">
          <button className="btn-user" onClick={goToAccountUser}>
            {question?.imageUrl && <img className="img-user" src={question?.imageUrl} alt="image not found" />}
            {question?.theme && (
              <div className="icon-user" style={{ backgroundColor: question?.theme }}>
                {question.name[0]}
              </div>
            )}
          </button>
          <div className="container-user-info-lines">
            <p className="user-name">{question.name}</p>
            <p className="user-time">{moment(question.createdAt).fromNow()}</p>
          </div>
        </div>
        <div className="container-question-route-question">
          <p className="question-route-title">{question.title}</p>
          <p className="question-route-description">{question.description}</p>
          <div className="container-question-route-tags">
            {question.tags.map((tag) => {
              return (
                <>
                  <p className="question-route-tag">{tag}</p>
                </>
              )
            })}
          </div>
          <UpvotePost post={question} type={QUESTION} />
          <DownvotePost post={question} type={QUESTION} />
        </div>
        {user && <AnswerForm question={question} />}
        <Answers />
      </div>
      <Questions isInsideQuestionRoute={true} questionId={question._id} />
    </div>
  )
}
