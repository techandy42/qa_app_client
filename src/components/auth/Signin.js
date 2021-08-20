import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin } from '../../actions/authActions'

const initialFormData = { email: '', password: '' }

export default function Signin() {
  const [formData, setFormData] = useState(initialFormData)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signin(formData, history))
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input maxLength="50" id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input maxLength="50" id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}
