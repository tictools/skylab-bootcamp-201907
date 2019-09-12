import React , { useContext } from 'react'
import { Link , withRouter } from 'react-router-dom'
import MyContext from '../ProviderContext'

import "./index.sass"

function StudentsPanel({ history , data }){
    const { setStudentId } = useContext(MyContext)
    return  <div>
                
                {data.map( student =>    <ul className="card">
                                                    <li key ={student._id}>
                                                            <p>Nom: {student.name} {student.surname}</p>
                                                            <p>Targeta sanitària: {student.healthcard}</p>
                                                            <p>Data de naixement: {student.birthdate}</p>
                                                        <div>
                                                            <Link to="/student-update" className="btn" onClick={()=>{
                                                                setStudentId(student._id)
                                                            }}>Actualitza dades</Link>
                                                            <Link to="/student-enrollment" className="btn" onClick={()=>{
                                                                setStudentId(student._id)
                                                            }}>Inscriu</Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                        )}

                                        <div className="card">Registra un alumne</div>
                
            </div>
            }
            
 export default withRouter(StudentsPanel)