import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT } from '../../constants/themeTypes'
import { Link, useHistory } from 'react-router-dom'
import * as API from '../../apis/appApi'

export default function AccountUser() {
  const accountUser = useSelector((state) => state.accountUser)
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const [accountUserQuestions, setAccountUserQuestions] = useState([])

  if ((user?.profile?._id || user?.profile?.googleId) === accountUser.userId) {
    history.push('/account')
  }

  useEffect(() => {
    const getUserQuestions = async () => {
      const { data } = await API.getUserQuestions(accountUser.userId)
      setAccountUserQuestions(data)
    }
    getUserQuestions()
  }, [])

  return (
    <div className="container-account">
      <div className="container-user-info">
        {accountUser?.imageUrl ? (
          <>
            <img className="picture-user" src={accountUser?.imageUrl} alt="image not found" />
          </>
        ) : (
          <>
            <div className="theme-user" style={{ backgroundColor: accountUser?.theme ? accountUser?.theme : DEFAULT }}>
              {accountUser?.name[0]}
            </div>
          </>
        )}
        <h1 className="name">{accountUser?.name}</h1>
      </div>
      <div className="container-selected-questions">
        {accountUserQuestions.map((question) => {
          return (
            <div className="container-control">
              <Link to={`/${question._id}`} className="link">
                <p>{question.title}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
