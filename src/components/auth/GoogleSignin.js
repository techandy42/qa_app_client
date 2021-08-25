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
    <div className="container-google-login">
      <GoogleLogin
        clientId="19416771174-be79eb2o4ql1ce1v83m4b60j10n94gc0.apps.googleusercontent.com"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} className="google-login">
            <i class="fab fa-google"></i> Google Sign In
          </button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  )
}
