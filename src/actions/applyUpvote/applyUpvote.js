export default function applyUpvote(question, user) {
  if (user?.profile?.googleId) {
    if (!question.upvotes.some((id) => id === user?.profile?.googleId)) {
      question.upvotes.push(user?.profile?.googleId)
    } else {
      question.upvotes = question.upvotes.filter((id) => id !== user?.profile?.googleId)
    }
  } else if (user?.profile?._id) {
    if (!question.upvotes.some((id) => id === user?.profile?._id)) {
      question.upvotes.push(user?.profile?._id)
    } else {
      question.upvotes = question.upvotes.filter((id) => id !== user?.profile?._id)
    }
  }
  return user
}
