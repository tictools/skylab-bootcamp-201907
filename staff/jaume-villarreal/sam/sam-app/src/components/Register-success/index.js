import React from 'react'
import { Link } from 'react-router-dom'

function RegisterSuccess(){
    return  <div>
                <p>El procés de registre s'ha realitzat correctament.</p>
                <Link className="btn" to="/">Torna</Link>
                <Link className="btn" to="/login">Accedeix</Link>
            </div>
}

export default RegisterSuccess