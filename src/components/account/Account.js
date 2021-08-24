import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as API from '../../apis/appApi'
import { Link } from 'react-router-dom'
import QuestionUpdate from '../home/questions/QuestionUpdate'
import { DEFAULT } from '../../constants/themeTypes'

export default function Account() {
  const user = useSelector((state) => state.user)
  const [userQuestions, setUserQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [submitCounter, setSubmitCounter] = useState(0)
  const [deleteCounter, setDeleteCounter] = useState(0)

  useEffect(() => {
    const getUserQuestions = async () => {
      const { data } = await API.getUserQuestions(user?.profile?.googleId || user?.profile?._id)
      setUserQuestions(data)
    }
    getUserQuestions()
  }, [])

  useEffect(() => {
    if (userQuestions && selectedQuestion) {
      const newUserQuestions = userQuestions.map((question) => (question._id === selectedQuestion._id ? selectedQuestion : question))
      setUserQuestions(newUserQuestions)
      setSelectedQuestion(null)
    }
  }, [submitCounter])

  useEffect(() => {
    if (userQuestions && selectedQuestion) {
      const newUserQuestions = userQuestions.filter((question) => question._id !== selectedQuestion._id)
      setUserQuestions(newUserQuestions)
      setSelectedQuestion(null)
    }
  }, [deleteCounter])

  return (
    <div className="container-account">
      <div className="container-user-info">
        {user?.profile?.imageUrl ? (
          <>
            <img className="picture-user" src={user?.profile?.imageUrl} alt="image not found" />
          </>
        ) : (
          <>
            <div className="theme-user" style={{ backgroundColor: user?.profile?.theme ? user?.profile?.theme : DEFAULT }}>
              {user?.profile?.name[0]}
            </div>
          </>
        )}
        <h1 className="name">{user?.profile?.name}</h1>
      </div>
      {!selectedQuestion ? (
        <div className="container-selected-questions">
          {userQuestions?.map((question) => {
            return (
              <div className="container-control">
                <Link to={`/${question._id}`} className="link">
                  <p>{question.title}</p>
                </Link>
                <button className="btn-control" onClick={() => setSelectedQuestion(question)}>
                  Update or Delete
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          <QuestionUpdate
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            submitCounter={submitCounter}
            setSubmitCounter={setSubmitCounter}
            deleteCounter={deleteCounter}
            setDeleteCounter={setDeleteCounter}
          />
        </div>
      )}
    </div>
  )
}
