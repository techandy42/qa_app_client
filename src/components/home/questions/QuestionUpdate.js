import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateQuestion, deleteQuestion } from '../../../actions/questionActions'
import AutosizingTextarea from '../../textarea/AutosizingTextarea'
import * as API from '../../../apis/appApi'
import { DELETE_USER_ANSWERS } from '../../../constants/actionTypes'

export default function QuestionUpdate({
  selectedQuestion,
  setSelectedQuestion,
  submitCounter,
  setSubmitCounter,
  deleteCounter,
  setDeleteCounter,
}) {
  const dispatch = useDispatch()
  const cachedQuestionId = `questionupdate-${selectedQuestion._id}`
  if (!sessionStorage.getItem(cachedQuestionId)) {
    sessionStorage.setItem(cachedQuestionId, JSON.stringify(selectedQuestion))
  }
  const [question, setQuestion] = useState(JSON.parse(sessionStorage.getItem(cachedQuestionId)))

  const handleChange = (e) => {
    const newQuestion = { ...question, [e.target.name]: e.target.value }
    setQuestion(newQuestion)
    sessionStorage.setItem(cachedQuestionId, JSON.stringify(newQuestion))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateQuestion(question._id, { ...question }))
    sessionStorage.removeItem(cachedQuestionId)
    setSelectedQuestion(question)
    setSubmitCounter(submitCounter + 1)
  }

  const handleDelete = async () => {
    dispatch(deleteQuestion(question._id))
    sessionStorage.removeItem(cachedQuestionId)

    //Delete the corresponding cachedAnswerId from the sessionStorage
    let sessionQuestionIds = Object.entries(sessionStorage)
      .map((sessionObject) => sessionObject[0].split('-'))
      .filter((sessionKey) => sessionKey[0] === 'answerform')
      .map((sessionKey) => sessionKey[2])
    let sessionSplitKeys = Object.entries(sessionStorage)
      .map((sessionObject) => sessionObject[0].split('-'))
      .filter((sessionKey) => sessionKey[0] === 'answerform')
    let sessionKeys = sessionSplitKeys.map((keys) => keys.join('-'))
    for (let i = 0; i < sessionQuestionIds.length; i++) {
      if (sessionQuestionIds[i] === question._id) {
        sessionStorage.removeItem(sessionKeys[i])
      }
    }

    dispatch({ type: DELETE_USER_ANSWERS })

    setDeleteCounter(deleteCounter + 1)
  }

  const handleRestore = () => {
    setQuestion(selectedQuestion)
    sessionStorage.setItem(cachedQuestionId, JSON.stringify(selectedQuestion))
  }

  return (
    <div className="container-question-update">
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
        <input id="tags" name="tags" type="text" value={question.tags} onChange={handleChange} />
        <button className="btn-control">Update</button>
      </form>
      <div className="container-btn-control">
        <button className="btn-control" onClick={handleRestore}>
          Restore
        </button>
        <button className="btn-control" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn-control" onClick={() => setSelectedQuestion(null)}>
          Back
        </button>
      </div>
    </div>
  )
}
