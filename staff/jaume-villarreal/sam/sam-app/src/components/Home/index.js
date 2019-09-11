import React , { useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
import logic from "../../logic"
import StudentsPanel from "../Students-panel"

import "./index.sass"
import "../../styles/button.sass"

function Home(){
    const [tutor , setTutor] = useState(undefined)
    const [students , setStudents] = useState(undefined)

   
    
    useEffect(()=> {
        async function retrieveUsers(){
            try{
                const tutorToken = logic.userCredentials
                const { tutor } = await logic.retrieveTutor(tutorToken)
                setTutor(tutor)
                const { studentsArray } = await logic.retrieveStudentsByTutor(tutorToken)
                setStudents(studentsArray)
            }catch({ message }){
                console.log(message)
            }
        }
        retrieveUsers()
    },[])


    function handleLogout(){
        logic.isUserLoggedOut()
        setTutor(undefined)
        setStudents(undefined)
    }

    return  <div className = "main">
                <h1>Home</h1>
                {students &&    <div className="card-container">
                                    <StudentsPanel data = {students}/>
                                </div>}
                <button className="btn" onClick={handleLogout}><Link to="/">Sortir</Link></button>
                </div>
}
            
export default Home