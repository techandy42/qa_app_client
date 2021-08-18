import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { SIGNOUT } from '../../constants/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { DEFAULT } from '../../constants/themeTypes'

export default function Navbar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const user = useSelector((state) => state.user)

  const signout = () => {
    dispatch({ type: SIGNOUT })
  }

  const goBackInUrl = () => {
    history.goBack()
  }

  return (
    <div>
      <Link to="/">
        <div style={{ height: '100px', width: '100px', backgroundColor: 'yellow' }}>Q</div>
      </Link>
      {user ? (
        <div>
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
          <p>{user?.profile?.name}</p>
          <button onClick={() => signout()}>Logout</button>
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
