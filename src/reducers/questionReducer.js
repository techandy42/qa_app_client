import {
  FETCH_ALL_QUESTIONS,
  CREATE_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  UPVOTE_QUESTION,
  DOWNVOTE_QUESTION,
} from '../constants/actionTypes'

const questionReducer = (questions = [], action) => {
  switch (action.type) {
    case FETCH_ALL_QUESTIONS:
      return action.payload
    case CREATE_QUESTION:
      return [...questions, action.payload]
    case DELETE_QUESTION:
      return questions.filter((question) => question._id !== action.payload)
    case UPDATE_QUESTION:
      return questions.map((question) => (question._id === action.payload._id ? action.payload : question))
    case UPVOTE_QUESTION:
      return questions.map((question) => (question._id === action.payload._id ? action.payload : question))
    case DOWNVOTE_QUESTION:
      return questions.map((question) => (question._id === action.payload._id ? action.payload : question))
    default:
      return questions
  }
}

export default questionReducer
