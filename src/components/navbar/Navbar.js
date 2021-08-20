import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { RESET_ACCOUNT_USER, SET_ACCOUNT_USER, SIGNOUT } from '../../constants/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { DEFAULT } from '../../constants/themeTypes'
import { ACCOUNT_USER_PROFILE } from '../../constants/storageKeys'

export default function Navbar() {
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

  const goBackInUrl = () => {
    history.goBack()
  }

  const goToAccount = () => {
    history.push('/account')
  }

  return (
    <div>
      <Link to="/">
        <div style={{ height: '100px', width: '100px', backgroundColor: 'yellow' }}>Q</div>
      </Link>
      {user ? (
        <div>
          <button onClick={goToAccount}>
            {user?.profile?.imageUrl ? (
              <>
                <img src={user?.profile?.imageUrl} alt="image not found" />
              </>
            ) : (
              <>
                <div
                  style={{ height: '100px', width: '100px', backgroundColor: user?.profile?.theme ? user?.profile?.theme : DEFAULT }}
                ></div>
              </>
            )}
          </button>
          <p>{user?.profile?.name}</p>
          <button onClick={signout}>Logout</button>
          {location.pathname !== '/questionForm' ? (
            <>
              <Link to="/questionForm">
                <button>Create Question</button>
              </Link>
            </>
          ) : (
            <>
              <button onClick={goBackInUrl}>Go Back</button>
            </>
          )}
        </div>
      ) : (
        <div>
          {location.pathname === '/auth' ? (
            <button onClick={goBackInUrl}>Go Back</button>
          ) : (
            <Link to="/auth">
              <button>Sign In</button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
