import { SIGNIN, SIGNOUT } from '../constants/actionTypes'
import { PROFILE } from '../constants/storageKeys'

const authReducer = (authData = JSON.parse(localStorage.getItem(PROFILE)), action) => {
  switch (action.type) {
    case SIGNIN:
      localStorage.setItem(PROFILE, JSON.stringify(action.payload))
      return action.payload
    case SIGNOUT:
      localStorage.removeItem(PROFILE)
      return null
    default:
      return authData
  }
}

export default authReducer
