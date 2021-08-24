import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QUESTION, ANSWER } from '../../../constants/postTypes'
import { upvoteQuestion } from '../../../actions/questionActions'
import { upvoteAnswer } from '../../../actions/answerActions'

export default function UpvotePost({ post, type }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleUpvote = () => {
    switch (type) {
      case QUESTION:
        dispatch(upvoteQuestion(post._id, post, user))
        break
      case ANSWER:
        dispatch(upvoteAnswer(post._id, post, user))
        break
      default:
        break
    }
  }

  return (
    <div>
      {user ? (
        <button className="thumb-down btn-thumb-down" onClick={handleUpvote}>
          <i class="fas fa-thumbs-up"></i> {post.upvotes.length}
        </button>
      ) : (
        <p className="thumb-down">
          <i class="fas fa-thumbs-up"></i> {post.upvotes.length}
        </p>
      )}
    </div>
  )
}
