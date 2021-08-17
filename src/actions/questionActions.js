import { FETCH_ALL, CREATE, DELETE, UPDATE, UPVOTE, DOWNVOTE } from '../constants/actionTypes'
import * as API from '../apis/appApi'
import applyUpvote from './applyUpvote/applyUpvote'
import applyDownvote from './applyDownvote/applyDownvote'

export const getQuestions = () => async (dispatch) => {
  try {
    const { data } = await API.getQuestions()

    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error)
    console.log('Error in fetching questions')
  }
}

export const createQuestion = (question) => async (dispatch) => {
  try {
    const { data } = await API.createQuestion(question)

    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
    console.log('Error in creating the question')
  }
}

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE, payload: id })

    await API.deleteQuestion(id)
  } catch (error) {
    console.log(error)
    console.log('Error in deleting the question')
  }
}

export const updateQuestion = (id, question) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE, payload: question })

    await API.updateQuestion(id, question)
  } catch (error) {
    console.log(error)
    console.log('Error in updating the question')
  }
}

export const upvoteQuestion = (id, question, user) => async (dispatch) => {
  try {
    dispatch({ type: UPVOTE, payload: applyUpvote(question, user) })

    await API.upvoteQuestion(id)
  } catch (error) {
    console.log(error)
    console.log('Error in upvote the question')
  }
}

export const downvoteQuestion = (id, question, user) => async (dispatch) => {
  try {
    dispatch({ type: DOWNVOTE, payload: applyDownvote(question, user) })

    await API.downvoteQuestion(id)
  } catch (error) {
    console.log(error)
    console.log('Error in downvoting the question')
  }
}
