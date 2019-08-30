import React, { useState } from 'react'
import { withRouter , Route } from 'react-router-dom'
// import React, { useEffect } from 'react'
import MyContext from '../Provider-Context';

import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'

import './index.sass'

function App() {
  const [credentials,setCredentials] = useState('')

  return  <MyContext.Provider value={{credentials, setCredentials}} >  
              <div className="App">
                <p>credentials: {credentials}</p>
                <Route exact path="/" component={Landing} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
              </div>
          </MyContext.Provider>
}

export default withRouter(App)

// <Route path="/login" render={() => credentials?<Login />:another component} />