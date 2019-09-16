import React , { useState , useEffect , useContext } from 'react'
import { Link , withRouter } from "react-router-dom"
import MyContext from '../ProviderContext'
import logic from "../../logic"
import Feedback from "../Feedback"
import "./index.sass"

function CheckEnrollment({ history }){

    const { studentId } = useContext(MyContext)

    const [year , setYear] = useState(undefined)
    const [student , setStudent ] = useState(undefined)
    const [enrollment , setEnrollment] = useState(undefined)
    const [error , setError] = useState(undefined)

    useEffect(()=> {
        const date = new Date()
        const currentYear = date.getFullYear()
        setYear(currentYear)
    } , [])

    useEffect( () => {
        async function retrieveStudent(id){
            try{
                const retrievedStudent = await logic.retrieveStudent(studentId)
                setStudent(retrievedStudent.student)
            }catch({ message }){
                history.push("/home")
            }
        }
        retrieveStudent(studentId)
    } , [] )    

    useEffect(() => {
        async function retrieveEnrollment(id){
            try{
                const { enrollment } = await logic.retrieveCurrentEnrollment(id)
                setEnrollment(enrollment)
            }catch({ message }){
                setError(logic.translateMessage(message))
            }
        }
        retrieveEnrollment(studentId)
    } , [])

    console.log("enrollment: " , enrollment)

    return  <div>
                {student && <h1 className="home-header">Dades d'inscripció - Casal d'estiu {year && year}</h1>}
                {student && <h2 className="home-subheader">{student.name} {student.surname}</h2>}
                {enrollment &&  <div>
                                    <p>
                                        {enrollment.year}
                                    </p>
                                    <p>
                                        {enrollment.activity}
                                    </p>
                                    <p>
                                        {enrollment.allergy}
                                    </p>
                                    <p>
                                        {enrollment.excursionAuth = enrollment.excursionAuth ? "sí" : "no"}
                                    </p>
                                    <p>
                                        {enrollment.group}
                                    </p>
                                    <p>
                                        {enrollment.imageAuth = enrollment.imageAuth ? "sí" : "no"}
                                    </p>
                                    <p>
                                        {enrollment.illness = enrollment.illness === "" ? "no detallada" : enrollment.illness}
                                    </p>
                                    <p>
                                        {enrollment.medication = enrollment.medication === "" ? "no detallada" : enrollment.medication}
                                    </p>
                                    <p>
                                        {enrollment.observations = enrollment.observations === "" ? "no detallada" : enrollment.observations}
                                    </p>
                                    <p>
                                        {enrollment.allergy = enrollment.allergy === "" ? "no detallada" : enrollment.allergy}
                                    </p>
                                    <p>
                                        {enrollment.shirt} 
                                    </p>
                                    
                                    { enrollment.weeks.map( week =>  <div>   
                                                                            <h3>Setmana {week.number}</h3>  
                                                                            <p>Jornada: {week.category === "part" ? "Matí" : "Jornada completa"}</p>
                                                                            <p>Permanències de matí: {week.morningPermanence ? "sí" : "no"}</p>
                                                                            <p>Permanències de matí: {week.afternoonPermanence ? "sí" : "no"}</p>
                                                                            <p>Servei de menjador: {week.lunch ? "sí" : "no"}</p>
                                                                        </div>  
                                    )}
                                </div>}
                {error && <div className="warning-panel">
                                    <section className="warning-panel__wrapper">
                                        <p className="warning-text">L'usuari encara no s'ha registrat al casal.</p>
                                        <div className="button-set">
                                            <Link className="btn btn--link btn--success" to="/home">Torna</Link>
                                            <Link className="btn btn--link btn--success" to="/register-enrollment">Registra</Link>
                                        </div>
                                    </section>
                                </div>}
                {enrollment && <Link className="btn btn--link btn--back" to="/home">Torna</Link>}
            </div>
}

export default withRouter(CheckEnrollment)