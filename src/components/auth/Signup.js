import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../../actions/authActions'

const initialFormData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Signup() {
  const [formData, setFormData] = useState(initialFormData)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signup(formData, history))
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}
