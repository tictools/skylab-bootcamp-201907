/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import myContext from './Provider-Context'
import Landing from './Landing'
import Register from './Register'

import { withRouter, Route } from 'react-router-dom'
import logic from '../logic'

const { id, token } = sessionStorage

function App({ history }) {
  const [view, setView] = useState('')
  const [credentials, setCredentials] = useState({ id, token })
  const [user, setUser] = useState(undefined)
  
  const[products,setProducts] = useState(undefined)

  return (
      <div className="App">
          <myContext.Provider value={{ view, setView, credentials, setCredentials, user, setUser, products,setProducts }} >
            <div className="App">
              <p>credentials: {credentials}</p>
              <Route exact path="/" component={Landing} />
              <Route path="/register" component={Register} />
            </div>
          </myContext.Provider>
        </div>
    )
}
export default withRouter(App)