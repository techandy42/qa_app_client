import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SIGNIN } from '../../constants/actionTypes'

export default function GoogleSignin() {
  const dispatch = useDispatch()
  const history = useHistory()

  const googleSuccess = (res) => {
    const profile = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: SIGNIN, payload: { profile, token } })

      history.goBack()
    } catch (error) {
      alert('Google Login has failed. Please try with a different google account or use the manual signin')
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    alert('Google Login has failed. Please try with a different google account or use the manual signin')
  }

  return (
    <div>
      <h1>Google OAuth</h1>
      <GoogleLogin
        clientId="555678566581-mteo4n6po7eu93b7hd2hikti9o04srvk.apps.googleusercontent.com"
        render={(renderProps) => <button onClick={renderProps.onClick}>Google Sign In</button>}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  )
}
