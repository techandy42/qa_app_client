import React, { useState } from 'react'
import moment from 'moment'
import Questions from './Questions'
import UpvotePost from '../votePost/UpvotePost'
import DownvotePost from '../votePost/DownvotePost'
import { PROFILE } from '../../../constants/storageKeys'
import { QUESTION } from '../../../constants/postTypes'

export default function QuestionRoute({ question }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(PROFILE)))

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
      <Questions isInsideQuestionRoute={true} questionId={question._id} />
    </div>
  )
}
