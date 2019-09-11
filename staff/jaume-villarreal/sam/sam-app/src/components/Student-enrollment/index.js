import React from "react"
import { Link } from "react-router-dom"

function StudentEnrollment(){
    return  <div>
                <h1>Formulari d'inscripció</h1>
                <Link className="btn" to="/home">Torna</Link>
            </div>   
}

export default StudentEnrollment