import React from 'react'
import { Link } from 'react-router-dom'

function UpdateSuccess(){
    return  <div className="succes-panel">
                <p>El procés d'actualització s'ha realitzat correctament.</p>
                <Link className="btn" to="/home">Torna</Link>
            </div>
}

export default UpdateSuccess