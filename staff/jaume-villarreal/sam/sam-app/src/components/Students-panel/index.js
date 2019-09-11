import React from 'react'
import { Link } from 'react-router-dom'

import "./index.sass"

function StudentsPanel({ data }){
    console.log(data)
    return  <div>
                
                {data.map(student =>    <div className="card">
                                                <ul>
                                                <li key ={student.id}>Nom: {student.name} {student.surname}</li>
                                                <li key ={student.id}>Targeta sanitària: {student.healthcard}</li>
                                                <li key ={student.id}>Data de naixement: {student.birthdate}</li>
                                            </ul>
                                            <div>
                                                <Link className="btn" to="/student-update">Actualitza dades</Link>
                                                <Link className="btn" to="/student-enrollment">Inscriu</Link>
                                            </div>
                                        </div>
                                        )}

                                        <div className="card">Registra un alumne</div>
                
            </div>
            }
            
            export default StudentsPanel
                // {props.items.map(item => <li key={item.id} onClick={ () => {
                //     props.onItem(item.id)
                // }}>
                //     {props.paintItem(item)}
                // </li>)}