import React from 'react'
import moment from 'moment'

export default function Question({ question }) {
  return (
    <div>
      {question?.imageUrl && <img src={question?.imageUrl} alt="image not found" />}
      {question?.theme && <div style={{ height: '100px', width: '100px', backgroundColor: question?.theme }}></div>}
      <p>{question.name}</p>
      <p>{moment(question.createdAt).fromNow()}</p>
      <p>{question.title}</p>
    </div>
  )
}
