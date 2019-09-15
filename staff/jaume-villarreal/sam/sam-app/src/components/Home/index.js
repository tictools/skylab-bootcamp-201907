import React , { useEffect , useState , useContext } from 'react'
import MyContext from '../ProviderContext'
import logic from "../../logic"

import StudentsPanel from "../Students-panel"
import Feedback from "../Feedback"

import "./index.sass"
import "../../styles/button.sass"

function Home(){
    
    const { setTutor } = useContext(MyContext)
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

    return  <div className = "main">
                {students && <h1>Home</h1>}
                
                {students &&    <div className="card-container">
                                    <StudentsPanel data = {students}/>
                                </div>
                }
                {error && <Feedback message = {error} />}
            </div>
}
            
export default Home