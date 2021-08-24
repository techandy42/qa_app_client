import React from 'react'
import { RESET_ACCOUNT_USER, SET_ACCOUNT_USER } from '../constants/actionTypes'
import { ACCOUNT_USER_PROFILE } from '../constants/storageKeys'

/*
The action.payload
{
  userId: ...,
  name: ...,
  imageUrl: ?,
  theme: ?
}
*/

export default function accountUserReducer(accountUser = JSON.parse(sessionStorage.getItem(ACCOUNT_USER_PROFILE)), action) {
  switch (action.type) {
    case SET_ACCOUNT_USER:
      sessionStorage.setItem(ACCOUNT_USER_PROFILE, JSON.stringify(action.payload))
      return action.payload
    case RESET_ACCOUNT_USER:
      sessionStorage.removeItem(ACCOUNT_USER_PROFILE)
      return null
    default:
      return accountUser
  }
}
