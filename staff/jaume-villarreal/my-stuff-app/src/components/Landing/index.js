import React from 'react'

export default function({onView}){
    return  <>
                <h1>landing</h1>
                <p>landing page</p>
                    <button onClick={event =>{
                        event.preventDefault()
                        onView('register')
                    }}>register</button>

                    <button onClick = {event =>{
                        event.preventDefault()
                        onView('login')
                    }}>login</button>
            </>
}