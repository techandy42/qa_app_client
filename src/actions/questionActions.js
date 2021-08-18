import {
  FETCH_ALL_QUESTIONS,
  CREATE_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  UPVOTE_QUESTION,
  DOWNVOTE_QUESTION,
} from '../constants/actionTypes'
import * as API from '../apis/appApi'
import applyUpvote from './applyVote/applyUpvote'
import applyDownvote from './applyVote/applyDownvote'

export const getQuestions = () => async (dispatch) => {
  try {
    const { data } = await API.getQuestions()

    dispatch({ type: FETCH_ALL_QUESTIONS, payload: data })
  } catch (error) {
    console.log(error)
    console.log('Error in fetching questions')
  }
}

export const createQuestion = (question) => async (dispatch) => {
  try {
    const { data } = await API.createQuestion(question)

    dispatch({ type: CREATE_QUESTION, payload: data })
  } catch (error) {
    console.log(error)
    console.log('Error in creating the question')
  }
}

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_QUESTION, payload: id })

    await API.deleteQuestion(id)
  } catch (error) {
    console.log(error)
    console.log('Error in deleting the question')
  }
}

export const updateQuestion = (id, question) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUESTION, payload: question })

    await API.updateQuestion(id, question)
  } catch (error) {
    console.log(error)
    console.log('Error in updating the question')
  }
}

export const upvoteQuestion = (id, question, user) => async (dispatch) => {
  try {
    dispatch({ type: UPVOTE_QUESTION, payload: applyUpvote(question, user) })

    await API.upvoteQuestion(id)
  } catch (error) {
    console.log(error)
    console.log('Error in upvote the question')
  }
}

export const downvoteQuestion = (id, question, user) => async (dispatch) => {
  try {
    dispatch({ type: DOWNVOTE_QUESTION, payload: applyDownvote(question, user) })

    await API.downvoteQuestion(id)
  } catch (error) {
    console.log(error)
    console.log('Error in downvoting the question')
  }
}
