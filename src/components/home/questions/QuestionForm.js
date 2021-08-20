import React, { useState } from 'react'
import AutosizingTextarea from '../../textarea/AutosizingTextarea'
import { useDispatch } from 'react-redux'
import { createQuestion } from '../../../actions/questionActions'
import { useHistory } from 'react-router-dom'
import { USER_PROFILE } from '../../../constants/storageKeys'

const initialQuestion = { title: '', description: '', tags: '' }

export default function QuestionForm() {
  const user = JSON.parse(localStorage.getItem(USER_PROFILE))
  const cachedQuestionId = `questionform-${user?.profile?.googleId || user?.profile?._id}`
  if (!sessionStorage.getItem(cachedQuestionId)) {
    sessionStorage.setItem(cachedQuestionId, JSON.stringify(initialQuestion))
  }
  const [question, setQuestion] = useState(JSON.parse(sessionStorage.getItem(cachedQuestionId)))
  const dispatch = useDispatch()
  const history = useHistory()

  const addParamsToQuestion = (question) => {
    if (user?.profile?.imageUrl) {
      return { ...question, tags: question.tags.split(' '), name: user?.profile?.name, imageUrl: user?.profile?.imageUrl }
    }
    return { ...question, tags: question.tags.split(' '), name: user?.profile?.name, theme: user?.profile?.theme }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const createdQuestion = await dispatch(createQuestion(addParamsToQuestion(question)))
    console.log(createdQuestion)
    sessionStorage.removeItem(cachedQuestionId)
    history.push(`/${createdQuestion._id}`)
  }

  const handleChange = (e) => {
    const newQuestion = { ...question, [e.target.name]: e.target.value }
    setQuestion(newQuestion)
    sessionStorage.setItem(cachedQuestionId, JSON.stringify(newQuestion))
  }

  const handleClear = () => {
    setQuestion(initialQuestion)
    sessionStorage.setItem(cachedQuestionId, JSON.stringify(initialQuestion))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <AutosizingTextarea labelName="Title" fieldName="title" value={question.title} handleChange={handleChange} isQuestionField={true} />
        <AutosizingTextarea
          labelName="Description"
          fieldName="description"
          value={question.description}
          handleChange={handleChange}
          isQuestionField={true}
        />
        <label htmlFor="tags">Tags</label>
        <input maxLength="200" id="tags" name="tags" type="text" value={question.tags} onChange={handleChange} />
        <button type="button" onClick={handleClear}>
          Clear
        </button>
        <button>Submit</button>
      </form>
    </div>
  )
}
