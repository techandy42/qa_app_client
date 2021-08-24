export default function applyUpvote(post, user) {
  if (user?.profile?.googleId) {
    if (!post.upvotes.some((id) => id === user?.profile?.googleId)) {
      post.upvotes.push(user?.profile?.googleId)
    } else {
      post.upvotes = post.upvotes.filter((id) => id !== user?.profile?.googleId)
    }
  } else if (user?.profile?._id) {
    if (!post.upvotes.some((id) => id === user?.profile?._id)) {
      post.upvotes.push(user?.profile?._id)
    } else {
      post.upvotes = post.upvotes.filter((id) => id !== user?.profile?._id)
    }
  }
  return user
}
