import React, { useState } from 'react'
// import React, { useEffect } from 'react'
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'

import { Route , withRouter } from 'react-router-dom'

import logic from '../../logic'

export default function App() {

  const [view,setView] = useState('landing')
  // const [credentials,setCredentials] = useState('')

  async function handleRegister(name, surname, email, password){
    try {
      await logic.registerUser(name, surname, email, password)

      console.log('ok, registered... TODO show succeed register panel')
    } catch ({ message }) {
      console.log(message)
    }
  }

  async function handleLogin(email, password){
    try {
      await logic.authenticateUser( email, password)
      console.log('ok, logged')
    } catch ({ message }) {
      console.log('fail login', message)
    }
  }

  return <div className="App">
    {view === 'landing' && <Landing onView={setView} />}
    {view === 'register' && <Register onView={setView} onRegister={handleRegister} />}
    {view === 'login' && <Login onView={setView} onLogin={handleLogin} />}
  </div>
}

export default withRouter(App)
