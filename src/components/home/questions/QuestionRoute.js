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

export default function QuestionRoute({ question }) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnswers(question._id))
  }, [question])

  return (
    <div>
      {question?.imageUrl && <img src={question?.imageUrl} alt="image not found" />}
      {question?.theme && <div style={{ height: '100px', width: '100px', backgroundColor: question?.theme }}></div>}
      <p>{question.name}</p>
      <p>{moment(question.createdAt).fromNow()}</p>
      <p>{question.title}</p>
      <p>{question.description}</p>
      {question.tags.map((tag) => {
        return (
          <>
            <p>{tag}</p>
          </>
        )
      })}
      {user ? (
        <>
          <UpvotePost post={question} type={QUESTION} />
          <DownvotePost post={question} type={QUESTION} />
        </>
      ) : (
        <>
          <p>Upvotes: {question.upvotes.length}</p>
          <p>Downvotes: {question.downvotes.length}</p>
        </>
      )}
      {user && <AnswerForm question={question} />}
      <Answers />
      <Questions isInsideQuestionRoute={true} questionId={question._id} />
    </div>
  )
}
