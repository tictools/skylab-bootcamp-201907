import React from 'react'
import { Link } from 'react-router-dom'

function Landing (){
    return  <>
                <button><Link to="/register">Registra't</Link></button>
                <button><Link to="/login">Accedeix</Link></button>
            </>
}

export default Landing