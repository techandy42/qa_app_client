import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QUESTION, ANSWER } from '../../../constants/postTypes'
import { upvoteQuestion } from '../../../actions/questionActions'

export default function UpvotePost({ post, type }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleUpvote = () => {
    switch (type) {
      case QUESTION:
        dispatch(upvoteQuestion(post._id, post, user))
        break
      case ANSWER:
        break
      default:
        break
    }
  }

  return (
    <div>
      <button onClick={handleUpvote}>
        {`Upvote${post.upvotes.length > 1 ? 's' : ''}`} {post.upvotes.length}
      </button>
    </div>
  )
}
