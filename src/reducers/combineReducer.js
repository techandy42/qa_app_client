import questions from './questionReducer'
import auth from './authReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({ questions, auth })

export default reducers
