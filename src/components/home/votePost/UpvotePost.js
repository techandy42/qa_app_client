import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PROFILE } from '../../../constants/storageKeys'
import { useUser, useUserUpdate } from '../../contexts/UserContext'

export default function UpvotePost({ post, type }) {
  const dispatch = useDispatch()
  // const user = useUser()
  // const updateUser = useUserUpdate()
  const user = useSelector((state) => state.auth)

  console.log(user)

  return (
    <div>
      <button>
        {`Upvote${post.upvotes.length > 1 ? 's' : ''}`} {post.upvotes.length}
      </button>
    </div>
  )
}
