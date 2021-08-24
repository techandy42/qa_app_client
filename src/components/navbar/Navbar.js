import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { RESET_ACCOUNT_USER, SET_ACCOUNT_USER, SIGNOUT } from '../../constants/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { DEFAULT } from '../../constants/themeTypes'
import { ACCOUNT_USER_PROFILE } from '../../constants/storageKeys'
import { getQuestions } from '../../actions/questionActions'
import { getSearchedQuestions } from '../../actions/questionActions'

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [searchParam, setSearchParam] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const user = useSelector((state) => state.user)

  const signout = () => {
    if (location.pathname === '/account') {
      dispatch({
        type: ACCOUNT_USER_PROFILE,
        payload: {
          userId: user?.profile?._id || user?.profile?.googleId,
          name: user?.profile?.name,
          imageUrl: user?.profile?.imageUrl,
          theme: user?.profile?.theme,
        },
      })
      history.push('/accountUser')
    }
    dispatch({ type: SIGNOUT })
  }

  const closeSideBar = () => {
    if (showSidebar) {
      setShowSidebar(false)
    }
  }

  const goBackInUrl = () => {
    closeSideBar()
    history.goBack()
  }

  const goToAccount = () => {
    closeSideBar()
    history.push('/account')
  }

  const goToQuestionForm = () => {
    closeSideBar()
    history.push('/questionForm')
  }

  const goToAuth = () => {
    closeSideBar()
    history.push('/auth')
  }

  const goToMain = () => {
    dispatch(getQuestions())
    closeSideBar()
    history.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(getSearchedQuestions(searchParam))
    history.push('/')
  }

  return (
    <div className="container-navbar">
      <button className="btn-main" onClick={goToMain}>
        Questionzz
      </button>
      <form className="container-search-bar" onSubmit={handleSubmit} style={{ marginRight: showSidebar ? '7rem' : '0rem' }}>
        <input className="field-search-bar" type="text" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
        <button className="btn-search">
          <i class="fas fa-arrow-up"></i>
        </button>
      </form>
      {user ? (
        <div className="container-user-info">
          <button className="btn-user-icon" onClick={goToAccount}>
            {user?.profile?.imageUrl ? (
              <>
                <img className="img-user-icon" src={user?.profile?.imageUrl} alt="image not found" />
              </>
            ) : (
              <>
                <div className="img-user-icon" style={{ backgroundColor: user?.profile?.theme ? user?.profile?.theme : DEFAULT }}>
                  {user?.profile?.name[0]}
                </div>
              </>
            )}
          </button>
          <button className="btn-nav" onClick={signout}>
            Logout
          </button>
          {location.pathname !== '/questionForm' ? (
            <>
              <button className="btn-nav" onClick={goToQuestionForm}>
                Create Question
              </button>
            </>
          ) : (
            <>
              <button className="btn-nav" onClick={goBackInUrl}>
                Go Back
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="container-user-info">
          {location.pathname === '/auth' ? (
            <button className="btn-nav" onClick={goBackInUrl}>
              Go Back
            </button>
          ) : (
            <button className="btn-nav" onClick={goToAuth}>
              Sign In
            </button>
          )}
        </div>
      )}
      <button className="btn-hamburger" onClick={() => setShowSidebar(!showSidebar)} style={{ display: showSidebar ? 'none' : 'block' }}>
        <i class="fas fa-bars"></i>
      </button>
      <div className="container-side-bar" style={{ display: showSidebar ? 'flex' : 'none', position: 'fixed' }}>
        <button className="btn-side-bar-x" onClick={() => setShowSidebar(!showSidebar)} style={{ marginTop: user ? '8rem' : '1.4rem' }}>
          <i class="fas fa-times"></i>
        </button>
        {user ? (
          <>
            <button className="btn-side-bar" onClick={goToAccount}>
              My Account
            </button>
            <button className="btn-side-bar" onClick={signout}>
              Logout
            </button>
            {location.pathname !== '/questionForm' ? (
              <>
                <button className="btn-side-bar" onClick={goToQuestionForm}>
                  Create Question
                </button>
              </>
            ) : (
              <>
                <button className="btn-side-bar" onClick={goBackInUrl}>
                  Go Back
                </button>
              </>
            )}
          </>
        ) : (
          <>
            {location.pathname === '/auth' ? (
              <button className="btn-side-bar" onClick={goBackInUrl}>
                Go Back
              </button>
            ) : (
              <button className="btn-side-bar" onClick={goToAuth}>
                Sign In
              </button>
            )}
          </>
        )}
      </div>
      <div className="container-side-bar-background" style={{ display: showSidebar ? 'block' : 'none', position: 'fixed' }}></div>
    </div>
  )
}
