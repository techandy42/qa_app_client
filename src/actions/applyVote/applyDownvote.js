export default function applyDownvote(post, user) {
  if (user?.profile?.googleId) {
    if (!post.downvotes.some((id) => id === user?.profile?.googleId)) {
      post.downvotes.push(user?.profile?.googleId)
    } else {
      post.downvotes = post.downvotes.filter((id) => id !== user?.profile?.googleId)
    }
  } else if (user?.profile?._id) {
    if (!post.downvotes.some((id) => id === user?.profile?._id)) {
      post.downvotes.push(user?.profile?._id)
    } else {
      post.downvotes = post.downvotes.filter((id) => id !== user?.profile?._id)
    }
  }
  return user
}
