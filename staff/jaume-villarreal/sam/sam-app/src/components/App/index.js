import React, { useState } from 'react'
import { HashRouter as Router , withRouter , Redirect , Route } from 'react-router-dom'
import MyContext from '../ProviderContext';

import logic from '../../logic'

import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import RegisterSuccess from '../Register-success'
import Home from '../Home'
import StudentUpdate from '../Student-update'
import StudentEnrollment from "../Student-enrollment"

import './index.sass'

function App() {
  // const [students , setStudents] = useState(undefined)
  const [tutor , setTutor] = useState(undefined)
  const [studentId , setStudentId] = useState(undefined)

  return  <MyContext.Provider value={{ tutor , setTutor , studentId , setStudentId }}>  
            <div className="App">
              <Router>
                <Route exact path="/" render={ () => !logic.isUserLoggedIn() ? <Landing /> : <Redirect to="/home"/> } />
                <Route path="/register" render={ () => !logic.isUserLoggedIn() ? <Register /> : <Redirect to="/home"/> }/>
                <Route path="/login" render={ () => !logic.isUserLoggedIn() ? <Login /> : <Redirect to="/home"/> } />
                <Route path="/register-success" render={ () => !logic.isUserLoggedIn() ? <RegisterSuccess /> : <Redirect to="/home"/> } />
                <Route path="/home" render={ () => logic.isUserLoggedIn() ? <Home /> : <Redirect to="/login"/> } />
                <Route path="/student-update" render={ () => logic.isUserLoggedIn() ? <StudentUpdate /> : <Redirect to="/"/> } />
                <Route path="/student-enrollment" render={ () => logic.isUserLoggedIn() ? <StudentEnrollment /> : <Redirect to="/"/> } />
            </Router>
            </div>
          </MyContext.Provider>
          }
export default withRouter(App)
