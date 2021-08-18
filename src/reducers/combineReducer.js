import questions from './questionReducer'
import user from './userReducer'
import answers from './answerReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({ questions, user, answers })

export default reducers
