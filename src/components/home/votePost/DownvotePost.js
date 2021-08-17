import React from 'react'
import { useDispatch } from 'react-redux'

export default function DownvotePost({ post, type }) {
  const dispatch = useDispatch()

  return (
    <div>
      <button>
        {`Downvote${post.downvotes.length > 1 ? 's' : ''}`} {post.downvotes.length}
      </button>
    </div>
  )
}
