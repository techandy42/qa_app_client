import {
  FETCH_ALL_ANSWERS,
  CREATE_ANSWER,
  DELETE_ANSWER,
  UPDATE_ANSWER,
  UPVOTE_ANSWER,
  DOWNVOTE_ANSWER,
  DELETE_USER_ANSWERS,
} from '../constants/actionTypes'

const answerReducer = (answers = [], action) => {
  switch (action.type) {
    case FETCH_ALL_ANSWERS:
      return action.payload
    case CREATE_ANSWER:
      return [...answers, action.payload]
    case DELETE_ANSWER:
      return answers.filter((answer) => answer._id !== action.payload)
    case UPDATE_ANSWER:
      return answers.map((answer) => (answer._id === action.payload._id ? action.payload : answer))
    case UPVOTE_ANSWER:
      return answers.map((answer) => (answer._id === action.payload._id ? action.payload : answer))
    case DOWNVOTE_ANSWER:
      return answers.map((answer) => (answer._id === action.payload._id ? action.payload : answer))
    case DELETE_USER_ANSWERS:
      return []
    default:
      return answers
  }
}

export default answerReducer
