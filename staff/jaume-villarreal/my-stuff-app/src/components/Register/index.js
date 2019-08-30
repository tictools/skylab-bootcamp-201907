import React , { useContext } from 'react'
// import MyContext from '../Provider-Context'

import { Link , Route , withRouter } from 'react-router-dom'

import logic from '../../logic'

props.history

function RegisterUser ({ history }) {

    async function onRegister(name, surname, email, password){
        try {
            await logic.registerUser(name, surname, email, password)

            history.push('/login')

            console.log('ok, registered... TODO show succeed register panel')

        } catch ({ message }) {
            console.log(message)
        }
    }

    return <>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event

            onRegister(name, surname, email, password)
        }}>
            <input type="text" name="name" />
            <input type="text" name="surname" />
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Proceed</button>
        </form>
        <button><Link to="/">Go back</Link></button>
    </>
}

export default withRouter(RegisterUser)