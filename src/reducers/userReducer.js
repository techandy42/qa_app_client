import { SIGNIN, SIGNOUT } from '../constants/actionTypes'
import { USER_PROFILE } from '../constants/storageKeys'

const userReducer = (user = JSON.parse(localStorage.getItem(USER_PROFILE)), action) => {
  switch (action.type) {
    case SIGNIN:
      localStorage.setItem(USER_PROFILE, JSON.stringify(action.payload))
      return action.payload
    case SIGNOUT:
      localStorage.removeItem(USER_PROFILE)
      return null
    default:
      return user
  }
}

export default userReducer
