import React , { useEffect , useState , useContext } from 'react'
import { Link } from 'react-router-dom'
import MyContext from '../ProviderContext'
import logic from "../../logic"

import Feedback from "../Feedback"

import "./index.sass"

function Home(){
    const { setTutor , setStudentId } = useContext(MyContext)
    const [ students , setStudents ] = useState(undefined)
    const [ error , setError ] = useState(undefined)
     
    useEffect(()=> {
        async function retrieveUsers(){
            try{
                const { tutor } = await logic.retrieveTutor()
                setTutor(tutor)
                const { studentsArray } = await logic.retrieveStudentsByTutor()
                setStudents(studentsArray)
            }catch({ message }){
                setError(message)
            }
        }
        retrieveUsers()
    },[])

    return  <div className="panel-wrapper">
                {students && <h1 className = "home-header">Usuaris registrats</h1>}
                
                {students &&    <div className="cards-wrapper">
                                    <ul className = "cards-container">
                                    {students.map( student =>    
                                            <li key ={student.id} className="card">
                                                <div className="card__info">
                                                    <p className="card__info--label">Nom:</p>
                                                    <p>{student.name} {student.surname}</p>
                                                    <p className="card__info--label">Targeta sanitària:</p>
                                                    <p>{student.healthcard}</p>
                                                    <p className="card__info--label">Data de naixement:</p>
                                                    <p>{student.birthdate}</p>
                                                </div>
                                                <div className="card__button-set">
                                                    <Link to="/student-update" className="btn btn--card" onClick={()=>{
                                                        setStudentId(student.id)
                                                    }}>Actualitza dades</Link>
                                                    <Link to="/student-enrollment" className="btn btn--card" onClick={()=>{
                                                        setStudentId(student.id)
                                                    }}>Inscriu</Link>
                                                    <Link to="/check-enrollment" className="btn btn--card" onClick={()=>{
                                                        setStudentId(student.id)
                                                    }}>Consulta les dades d'inscripció</Link>
                                                </div>
                                            </li>)}
                                    </ul>

                                                <Link to="/register-student" className="card">Registra un alumne</Link>
                                    
                                </div>
                }
                {error && <Feedback message = {error} />}
            </div>
}
            
export default Home