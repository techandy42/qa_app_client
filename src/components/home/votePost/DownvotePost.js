import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QUESTION, ANSWER } from '../../../constants/postTypes'
import { downvoteQuestion } from '../../../actions/questionActions'
import { downvoteAnswer } from '../../../actions/answerActions'

export default function DownvotePost({ post, type }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleDownvote = () => {
    switch (type) {
      case QUESTION:
        dispatch(downvoteQuestion(post._id, post, user))
        break
      case ANSWER:
        dispatch(downvoteAnswer(post._id, post, user))
        break
      default:
        break
    }
  }

  return (
    <div>
      {user ? (
        <button className="thumb-up btn-thumb-up" onClick={handleDownvote}>
          <i class="fas fa-thumbs-down"></i> {post.downvotes.length}
        </button>
      ) : (
        <p className="thumb-up">
          <i class="fas fa-thumbs-down"></i> {post.downvotes.length}
        </p>
      )}
    </div>
  )
}
