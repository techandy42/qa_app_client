import axios from 'axios'
import { PROFILE } from '../constants/storageKeys.js'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem(PROFILE)) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem(PROFILE)).token}`
  }
  return req
})

export const getQuestions = () => API.get('/questions')
export const createQuestion = (question) => API.post('/questions', question)
export const deleteQuestion = (id) => API.delete(`/questions/${id}`)
export const updateQuestion = (id, question) => API.patch(`/questions/${id}`, question)
export const upvoteQuestion = (id) => API.patch(`/questions/${id}/upvoteQuestion`)
export const downvoteQuestion = (id) => API.patch(`/questions/${id}/downvoteQuestion`)

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)
