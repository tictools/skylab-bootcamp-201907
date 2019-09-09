import React from 'react'
import { Link } from 'react-router-dom'

export default function(){
    return  <>
                <h1>landing</h1>
                <p>landing page</p>
                    <button><Link to="/register">Register</Link></button>
                    <button><Link to="/login">Login</Link></button>
            </>
}