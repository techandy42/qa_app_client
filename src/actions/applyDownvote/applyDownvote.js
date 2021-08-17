export default function applyDownvote(question, user) {
  if (user?.profile?.googleId) {
    if (!question.downvotes.some((id) => id === user?.profile?.googleId)) {
      question.downvotes.push(user?.profile?.googleId)
    } else {
      question.downvotes = question.downvotes.filter((id) => id !== user?.profile?.googleId)
    }
  } else if (user?.profile?._id) {
    if (!question.downvotes.some((id) => id === user?.profile?._id)) {
      question.downvotes.push(user?.profile?._id)
    } else {
      question.downvotes = question.downvotes.filter((id) => id !== user?.profile?._id)
    }
  }
  return user
}
