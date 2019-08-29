import React from 'react'

export default function ({ onView, onLogin }) {
    return <>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Proceed</button>
        </form>
        <button onClick={event => {
            event.preventDefault()

            onView('landing')
        }}>Go back</button>
    </>
}