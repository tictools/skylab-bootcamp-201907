import React from 'react'
import { Link } from 'react-router-dom'

function ProcessSuccess(){
    return   <div className="succes-panel">
                <p>El procés s'ha realitzat correctament.</p>
                <Link className="btn" to="/home">Torna</Link>
            </div>
}

export default ProcessSuccess