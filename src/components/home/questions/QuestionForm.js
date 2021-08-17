import React, { useState } from 'react'
import AutosizingTextarea from '../../textarea/AutosizingTextarea'
import { useDispatch } from 'react-redux'
import { createQuestion } from '../../../actions/questionActions'
import { useHistory } from 'react-router-dom'
import { PROFILE } from '../../../constants/storageKeys'

const initialQuestion = { title: '', description: '', tags: '' }

export default function QuestionForm() {
  const [question, setQuestion] = useState(initialQuestion)
  const dispatch = useDispatch()
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem(PROFILE))

  const addParamsToQuestion = (question) => {
    if (user?.profile?.imageUrl) {
      return { ...question, tags: question.tags.split(' '), name: user?.profile?.name, imageUrl: user?.profile?.imageUrl }
    }
    return { ...question, tags: question.tags.split(' '), name: user?.profile?.name, theme: user?.profile?.theme }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createQuestion(addParamsToQuestion(question)))
    history.push('/')
  }

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <AutosizingTextarea labelName="Title" fieldName="title" type="text" value={question.title} handleChange={handleChange} />
        <AutosizingTextarea
          labelName="Description"
          fieldName="description"
          type="text"
          value={question.description}
          handleChange={handleChange}
        />
        <label htmlFor="tags">Tags</label>
        <input id="tags" name="tags" type="text" value={question.tags} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}
