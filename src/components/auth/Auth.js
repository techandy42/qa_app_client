import React, { useState } from 'react'

import GoogleSignin from './GoogleSignin'
import Signin from './Signin'
import Signup from './Signup'

export default function Auth() {
  const [signin, setSignin] = useState(true)

  return (
    <div className="container-form">
      <GoogleSignin />
      {signin ? <Signin /> : <Signup />}
      <button className="btn-sign-version-control" onClick={() => setSignin(!signin)}>
        {signin ? "Don't have an account, sign up" : 'Already have an account? Sign in'}
      </button>
    </div>
  )
}
