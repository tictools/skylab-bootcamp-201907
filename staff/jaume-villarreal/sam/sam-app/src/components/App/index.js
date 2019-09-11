import React, { useState } from 'react'
import { HashRouter as Router , withRouter , Redirect , Route } from 'react-router-dom'
import MyContext from '../ProviderContext';

import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import RegisterSuccess from '../Register-success'
import Home from '../Home'
import StudentsUpdate from '../Students-update'
import StudentEnrollment from "../Student-enrollment"

import './index.sass'
import isUserLoggedIn from '../../logic/is-user-logged-in';

function App() {
  const [tutor , setTutor] = useState(undefined)
  const [students , setStudents] = useState(undefined)

  return  <MyContext.Provider value={{ tutor , setTutor , students , setStudents }}>  
            <div className="App">
              <Router>
                <Route exact path="/" render={ () => !isUserLoggedIn() ? <Landing /> : <Redirect to="/home"/> } />
                <Route path="/register" render={ () => !isUserLoggedIn() ? <Register /> : <Redirect to="/home"/> }/>
                <Route path="/login" render={ () => !isUserLoggedIn() ? <Login /> : <Redirect to="/home"/> } />
                <Route path="/register-success" render={ () => !isUserLoggedIn() ? <RegisterSuccess /> : <Redirect to="/home"/> } />
                <Route path="/home" render={ () => isUserLoggedIn() ? <Home /> : <Redirect to="/login"/> } />
                <Route path="/student-update" render={ () => isUserLoggedIn() ? <StudentsUpdate /> : <Redirect to="/"/> } />
                <Route path="/student-enrollment" render={ () => isUserLoggedIn() ? <StudentEnrollment /> : <Redirect to="/"/> } />
            </Router>
            </div>
          </MyContext.Provider>
          }
export default withRouter(App)
