import axios from 'axios'
import { USER_PROFILE } from '../constants/storageKeys.js'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem(USER_PROFILE)) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem(USER_PROFILE)).token}`
  }
  return req
})

export const getSearchedQuestions = (searchParam) => API.get(`/searchedQuestions/${searchParam}`)

export const getQuestions = () => API.get('/questions')
export const getUserQuestions = (userId) => API.get(`/questions/${userId}`)
export const createQuestion = (question) => API.post('/questions', question)
export const deleteQuestion = (id) => API.delete(`/questions/${id}`)
export const updateQuestion = (id, question) => API.patch(`/questions/${id}`, question)
export const upvoteQuestion = (id) => API.patch(`/questions/${id}/upvoteQuestion`)
export const downvoteQuestion = (id) => API.patch(`/questions/${id}/downvoteQuestion`)

export const getAnswers = (questionId) => API.get(`/answers/${questionId}`)
export const createAnswer = (answer) => API.post('/answers', answer)
export const deleteAnswer = (id) => API.delete(`/answers/${id}`)
export const updateAnswer = (id, answer) => API.patch(`/answers/${id}`, answer)
export const upvoteAnswer = (id) => API.patch(`/answers/${id}/upvoteAnswer`)
export const downvoteAnswer = (id) => API.patch(`/answers/${id}/downvoteAnswer`)

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)
