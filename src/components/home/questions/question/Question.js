import React from 'react'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'

export default function Question({ question }) {
  const history = useHistory()

  const scrollToTop = () => {
    history.push(`/${question._id}`)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="container-question-inner">
      <div className="container-question-user-info">
        {question?.imageUrl && <img className="img-user" src={question?.imageUrl} alt="image not found" />}
        {question?.theme && (
          <div className="icon-user" style={{ backgroundColor: question?.theme }}>
            {question.name[0]}
          </div>
        )}
        <div className="container-question-user-info-inner">
          <p className="question-name">{question.name}</p>
          <p className="question-time">{moment(question.createdAt).fromNow()}</p>
        </div>
      </div>
      <p className="question-title" className="link" onClick={scrollToTop} style={{ fontSize: 'x-large', marginTop: '1rem' }}>
        {question.title}
      </p>
    </div>
  )
}
