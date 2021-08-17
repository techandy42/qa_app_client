import questions from './questionReducer'
import user from './authReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({ questions, user })

export default reducers
