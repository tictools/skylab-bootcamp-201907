import React, { useContext } from 'react'
import { Link , withRouter } from 'react-router-dom'
import logic from "../../logic"

import MyContext from '../Provider-Context'
// const myContext = useContext(MyContext)


function Login() {
    const { credentials , setCredentials } = useContext(MyContext)
    
    async function onLogin(email, password){
        try {
            const { id , token } = await logic.authenticateUser( email, password)
            console.log('ok, logged')
            setCredentials('000')
        } catch ({ message }) {
            console.log('fail login', message)
        }
    }

function onLogin(email, password){
    //    setCredentials('credentials')
    }
    return  <>
                    <h2>Login</h2>
                    <form onSubmit={event => {
                        event.preventDefault()

                        const { target: { email: { value: email }, password: { value: password } } } = event

                        onLogin(email, password)
                    }}>
                        <input type="email" name="email" />
                        <input type="password" name="password" />
                        <button>Proceed</button>
                    </form>
                    <button><Link to="/">Go back</Link></button>
            </>
}

export default withRouter(Login)