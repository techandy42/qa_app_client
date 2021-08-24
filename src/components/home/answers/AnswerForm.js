import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AutosizingTextarea from '../../textarea/AutosizingTextarea'
import { createAnswer } from '../../../actions/answerActions'

export default function AnswerForm({ question }) {
  const user = useSelector((state) => state.user)
  const cachedAnswerId = `answerform-${user?.profile?.googleId || user?.profile?._id}-${question._id}`
  if (!sessionStorage.getItem(cachedAnswerId)) {
    sessionStorage.setItem(cachedAnswerId, JSON.stringify([{ content: '', isImageUrl: false, index: 0 }]))
  }
  const [sections, setSections] = useState(JSON.parse(sessionStorage.getItem(cachedAnswerId)))
  const dispatch = useDispatch()

  useEffect(() => {
    setSections(JSON.parse(sessionStorage.getItem(cachedAnswerId)))
  }, [question])

  const getAnswerWithParamsAdded = () => {
    if (user?.profile?.imageUrl) {
      return { questionId: question._id, sections, name: user?.profile?.name, imageUrl: user?.profile?.imageUrl }
    }
    return { questionId: question._id, sections, name: user?.profile?.name, theme: user?.profile?.theme }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createAnswer(getAnswerWithParamsAdded()))
    setSections([{ content: '', isImageUrl: false, index: 0 }])
    sessionStorage.setItem(cachedAnswerId, JSON.stringify([{ content: '', isImageUrl: false, index: 0 }]))
  }

  const handleChange = (e, selectedSection) => {
    const newSections = sections.map((section) =>
      section.index === selectedSection.index
        ? { content: e.target.value, isImageUrl: selectedSection.isImageUrl, index: selectedSection.index }
        : section
    )
    setSections(newSections)
    sessionStorage.setItem(cachedAnswerId, JSON.stringify(newSections))
  }

  const handleDelete = (selectedSection) => {
    const newSections = sections.filter((section) => section.index !== selectedSection.index)
    for (let i = 0; i < newSections.length; i++) {
      newSections[i].index = i
    }
    setSections(newSections)
    sessionStorage.setItem(cachedAnswerId, JSON.stringify(newSections))
  }

  const handleReset = () => {
    setSections([{ content: '', isImageUrl: false, index: 0 }])
    sessionStorage.setItem(cachedAnswerId, JSON.stringify([{ content: '', isImageUrl: false, index: 0 }]))
  }

  const addSection = (isImageUrl) => {
    setSections([...sections, { content: '', isImageUrl, index: sections.length }])
  }

  return (
    <div className="container-answer-form">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="title">Create an Answer as {user?.profile?.name}</h3>
        {sections.map((section) => {
          return (
            <div className="container-input-delete">
              {section.isImageUrl ? (
                <>
                  <input maxLength="2000" type="text" value={section.content} onChange={(e) => handleChange(e, section)} />
                  <img className="picture" src={section.content} />
                </>
              ) : (
                <>
                  <AutosizingTextarea
                    className="container-textarea"
                    value={section.content}
                    handleChange={handleChange}
                    isQuestionField={false}
                    section={section}
                  />
                </>
              )}
              <button className="btn-delete" type="button" onClick={() => handleDelete(section)}>
                Delete
              </button>
            </div>
          )
        })}
        <div className="container-btns">
          <button className="btn-menu" type="button" onClick={() => addSection(true)}>
            Add an Image URL
          </button>
          <button className="btn-menu" type="button" onClick={() => addSection(false)}>
            Add Text
          </button>
          <button className="btn-menu" type="button" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-menu">Submit</button>
        </div>
      </form>
    </div>
  )
}
