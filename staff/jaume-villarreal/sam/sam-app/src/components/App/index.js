import React, { useState } from 'react'
import { HashRouter as Router , withRouter , Redirect , Route } from 'react-router-dom'
import MyContext from '../ProviderContext';

import logic from '../../logic'

import Landing from '../Landing'
import RegisterTutor from '../Register-tutor'
import RegisterStudent from '../Register-student'
import Login from '../Login'
import RegisterSuccess from '../Register-success'
import RegisterStudentSuccess from "../Register-student-success"
import UpdateSuccess from '../Update-success'
import Home from '../Home'
import UpdateStudent from '../Student-update'
import RegisterEnrollment from "../Register-enrollment"

import './index.sass'

function App() {
  // const [students , setStudents] = useState(undefined)
  const [tutor , setTutor] = useState(undefined)
  const [studentId , setStudentId] = useState(undefined)

  return  <MyContext.Provider value={{ tutor , setTutor , studentId , setStudentId }}>  
            <div className="App">
              <Router>
                <Route exact path="/" render={ () => !logic.isUserLoggedIn() ? <Landing /> : <Redirect to="/home"/> } />
                <Route path="/register" render={ () => !logic.isUserLoggedIn() ? <RegisterTutor /> : <Redirect to="/home"/> }/>
                <Route path="/register-student" render={ () => logic.isUserLoggedIn() ? <RegisterStudent /> : <Redirect to="/login"/> }/>
                <Route path="/login" render={ () => !logic.isUserLoggedIn() ? <Login /> : <Redirect to="/home"/> } />
                <Route path="/register-success" render={ () => !logic.isUserLoggedIn() ? <RegisterSuccess /> : <Redirect to="/home"/> } />
                <Route path="/register-student-success" render={ () => logic.isUserLoggedIn() ? <RegisterStudentSuccess /> : <Redirect to="/home"/> } />
                <Route path="/update-success" render={ () => logic.isUserLoggedIn() ? <UpdateSuccess /> : <Redirect to="/login"/> } />
                <Route path="/home" render={ () => logic.isUserLoggedIn() ? <Home /> : <Redirect to="/login"/> } />
                <Route path="/student-update" render={ () => logic.isUserLoggedIn() ? <UpdateStudent /> : <Redirect to="/"/> } />
                <Route path="/student-enrollment" render={ () => logic.isUserLoggedIn() ? <RegisterEnrollment /> : <Redirect to="/"/> } />
            </Router>
            </div>
          </MyContext.Provider>
          }
export default withRouter(App)
