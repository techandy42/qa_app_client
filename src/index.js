import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import thunk from 'redux-thunk'
import { compose, applyMiddleware, createStore } from 'redux'
import reducers from './reducers/combineReducer'
import { Provider } from 'react-redux'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
