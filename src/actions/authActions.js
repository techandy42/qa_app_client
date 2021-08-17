import { SIGNIN } from '../constants/actionTypes'

import * as API from '../apis/appApi'

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signin(formData)

    dispatch({ type: SIGNIN, payload: data })

    history.goBack()
  } catch (error) {
    console.log(error)
    alert(error.response.data.message)
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signup(formData)

    dispatch({ type: SIGNIN, payload: data })

    history.goBack()
  } catch (error) {
    console.log(error)
    alert(error.response.data.message)
  }
}
