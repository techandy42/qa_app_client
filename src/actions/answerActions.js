import { FETCH_ALL_ANSWERS, CREATE_ANSWER, DELETE_ANSWER, UPDATE_ANSWER, UPVOTE_ANSWER, DOWNVOTE_ANSWER } from '../constants/actionTypes'
import * as API from '../apis/appApi'
import applyUpvote from './applyVote/applyUpvote'
import applyDownvote from './applyVote/applyDownvote'

export const getAnswers = (questionId) => async (dispatch) => {
  try {
    const { data } = await API.getAnswers(questionId)

    dispatch({ type: FETCH_ALL_ANSWERS, payload: data })
  } catch (error) {
    console.log(error)
    console.log('Error in fetching answers')
  }
}

export const createAnswer = (answer) => async (dispatch) => {
  try {
    const { data } = await API.createAnswer(answer)

    dispatch({ type: CREATE_ANSWER, payload: data })
  } catch (error) {
    console.log(error)
    console.log('Error in creating the answer')
  }
}

export const deleteAnswer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ANSWER, payload: id })

    await API.deleteAnswer(id)
  } catch (error) {
    console.log(error)
    console.log('Error in deleting the answer')
  }
}

export const updateAnswer = (id, answer) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ANSWER, payload: answer })

    await API.updateAnswer(id, answer)
  } catch (error) {
    console.log(error)
    console.log('Error in updating the answer')
  }
}

export const upvoteAnswer = (id, answer, user) => async (dispatch) => {
  try {
    dispatch({ type: UPVOTE_ANSWER, payload: applyUpvote(answer, user) })

    await API.upvoteAnswer(id)
  } catch (error) {
    console.log(error)
    console.log('Error in upvoting the answer')
  }
}

export const downvoteAnswer = (id, answer, user) => async (dispatch) => {
  try {
    dispatch({ type: DOWNVOTE_ANSWER, payload: applyDownvote(answer, user) })

    await API.downvoteAnswer(id)
  } catch (error) {
    console.log(error)
    console.log('Error in downvoting the answer')
  }
}
