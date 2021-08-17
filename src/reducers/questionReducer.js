import { FETCH_ALL, CREATE, DELETE, UPDATE, UPVOTE, DOWNVOTE } from '../constants/actionTypes'

const questionReducer = (questions = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case CREATE:
      return [...questions, action.payload]
    case DELETE:
      return questions.filter((question) => question._id !== action.payload)
    case UPDATE:
      return questions.map((question) => (question._id === action.payload._id ? action.payload : question))
    case UPVOTE:
      return questions.map((question) => (question._id === action.payload._id ? action.payload : question))
    case DOWNVOTE:
      return questions.map((question) => (question._id === action.payload._id ? action.payload : question))
    default:
      return questions
  }
}

export default questionReducer
