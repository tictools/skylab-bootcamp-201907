import React , { useContext } from 'react'
import { Link , withRouter } from 'react-router-dom'
import MyContext from '../ProviderContext'

import "./index.sass"

function StudentsPanel({ history , data }){
    const { setStudentId } = useContext(MyContext)
    return  <div>
                <ul >
                {data.map( student =>    
                        <li key ={student.id} className="card">
                                <p>Nom: {student.name} {student.surname}</p>
                                <p>Targeta sanitària: {student.healthcard}</p>
                                <p>Data de naixement: {student.birthdate}</p>
                            <div>
                                <Link to="/student-update" className="btn" onClick={()=>{
                                    setStudentId(student.id)
                                }}>Actualitza dades</Link>
                                <Link to="/student-enrollment" className="btn" onClick={()=>{
                                    setStudentId(student.id)
                                }}>Inscriu</Link>
                            </div>
                        </li>)}
                </ul>

                                        <Link to="/register-student" className="card">Registra un alumne</Link>
                
            </div>
            }
            
 export default withRouter(StudentsPanel)