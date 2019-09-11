import React , { useContext } from 'react'
import MyContext from '../ProviderContext'

import { Link } from 'react-router-dom'

function Landing (){
    const { credentials } = useContext(MyContext)
    return  <div> 
                <h1>Landing</h1>
                <ul>
                    <li>
                        <Link className="btn" to="/register">Registra't</Link>
                    </li>
                    <li>
                        <Link className="btn" to="/login">Accedeix</Link>
                    </li>
                </ul>

            </div>
}

export default Landing