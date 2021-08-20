import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../../actions/authActions'

const initialFormData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Signup() {
  const [formData, setFormData] = useState(initialFormData)
  const history = useHistory()
  const dispatch = useDispatch()

  const validateFormData = () => {
    const password = formData.password
    let securityMessages = []
    if (password.search(/[a-z]/) === -1) {
      securityMessages.push('Must contain at least one lower case\n')
    }
    if (password.search(/\d/) === -1) {
      securityMessages.push('Must contain at least one number\n')
    }
    //Add the following to make the passwords more secure

    // if (password.search(/[A-Z]/) === -1) {
    //   securityMessages.push('Must contain at least one upper case\n')
    // }
    // if (password.search(/(\W)/) === -1 || password.search(/(\D)/) === -1) {
    //   securityMessages.push('Must contain at least one special symbol\n')
    // }
    if (password !== formData.confirmPassword) {
      securityMessages.push('Password must match the confirm password\n')
    }
    if (securityMessages.length > 0) {
      alert('Password is invalid\n' + securityMessages.join(''))
    }
    return securityMessages
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateFormData().length === 0) {
      dispatch(signup(formData, history))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input maxLength="50" id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
        <label htmlFor="lastName">Last Name</label>
        <input maxLength="50" id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input maxLength="50" id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          minLength="8"
          maxLength="50"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          minLength="8"
          maxLength="50"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
