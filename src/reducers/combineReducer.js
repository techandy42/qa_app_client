import questions from './questionReducer'
import user from './userReducer'
import answers from './answerReducer'
import accountUser from './accountUserReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({ questions, user, answers, accountUser })

export default reducers
