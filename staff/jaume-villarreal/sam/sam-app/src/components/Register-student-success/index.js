import React from 'react'
import { Link } from 'react-router-dom'

function RegisterStudentSuccess(){
    return   <div className="succes-panel">
                <p>El procés de registre s'ha realitzat correctament.</p>
                <Link className="btn" to="/home">Torna</Link>
            </div>
}

export default RegisterStudentSuccess