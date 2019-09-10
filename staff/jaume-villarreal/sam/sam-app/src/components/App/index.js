import React, { useState } from 'react'
import { HashRouter as Router , withRouter , Route } from 'react-router-dom'
import MyContext from '../ProviderContext';

import Landing from '../Landing'
import Register from '../Register'
// import Login from '../Login'

import './index.sass'

function App() {
  const [credentials,setCredentials] = useState(undefined)

  return  <MyContext.Provider value={{ credentials, setCredentials }}>  
              <div className="App">
                <Router>
                  <Route exact path="/" component={Landing} />
                  <Route path="/register" component={Register} />
                  </Router>
                  </div>
                  </MyContext.Provider>
                }
                export default withRouter(App)
                // <Route path="/login" component={Login} />

// <Route path="/login" render={() => credentials?<Login />:another component} />