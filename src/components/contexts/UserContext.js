import React, { useState, useContext } from 'react'
import { PROFILE } from '../../constants/storageKeys'

const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function useUserUpdate() {
  return useContext(UserUpdateContext)
}

export default function UserProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(PROFILE)))

  const updateUser = () => {
    setUser(JSON.parse(localStorage.getItem(PROFILE)))
  }

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>{children}</UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}
