import React, { useState } from 'react'
import AutosizingTextarea from '../../../textarea/AutosizingTextarea'
import { useDispatch } from 'react-redux'
import { updateAnswer } from '../../../../actions/answerActions'

export default function AnswerUpdateSections({ selectedAnswer, setSelectedAnswer }) {
  const cachedAnswerUpdateId = `answerupdate-${selectedAnswer._id}`
  if (!sessionStorage.getItem(cachedAnswerUpdateId)) {
    sessionStorage.setItem(cachedAnswerUpdateId, JSON.stringify(selectedAnswer))
  }
  const [answer, setAnswer] = useState(JSON.parse(sessionStorage.getItem(cachedAnswerUpdateId)))
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateAnswer(answer._id, answer))
    setSelectedAnswer(null)
  }

  const handleChange = (e, section) => {
    let newAnswer = { ...answer }
    for (let i = 0; i < newAnswer.sections.length; i++) {
      if (newAnswer.sections[i].index === section.index) {
        newAnswer.sections[i].content = e.target.value
      }
    }
    setAnswer(newAnswer)
    sessionStorage.setItem(cachedAnswerUpdateId, JSON.stringify(newAnswer))
  }

  const handleCancel = () => {
    sessionStorage.removeItem(cachedAnswerUpdateId)
    setSelectedAnswer(null)
  }

  return (
    <div className="container-answer-update">
      <form onSubmit={handleSubmit}>
        {answer.sections.map((section) => {
          return (
            <>
              {section.isImageUrl ? (
                <div className="container-url-picture">
                  <input className="url" maxLength="2000" value={section.content} onChange={(e) => handleChange(e, section)} />
                  <img className="picture" src={section.content} />
                </div>
              ) : (
                <>
                  <AutosizingTextarea value={section.content} handleChange={handleChange} isQuestionField={false} section={section} />
                </>
              )}
            </>
          )
        })}
        <div className="container-btn-control">
          <button className="btn-control">Update</button>
          <button className="btn-control" onClick={handleCancel} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
