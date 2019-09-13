import React , { useContext , useEffect , useState } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../ProviderContext'

import Feedback from "../Feedback"

import logic from "../../logic"

import { Link , Redirect } from "react-router-dom"

function UpdateStudent({ history }){
    const { studentId } = useContext(MyContext)

    const [student , setStudent] = useState(undefined)
    
    const [_name , setName] = useState(undefined)
    const [_surname , setSurname] = useState(undefined)
    const [_birthdate , setBirthdate] = useState(undefined)
    const [_healthcard , setHealthcard] = useState(undefined)
    
    const [result , setResult] = useState(undefined) // encén feedback panel

    useEffect( ()=>{
        async function retrieveStudent(id){
            try{
                const response = await logic.retrieveStudent(id)
                setStudent(response.student)

                setName(response.student.name)
                setSurname(response.student.surname)
                setBirthdate(response.student.birthdate)
                setHealthcard(response.student.healthcard)
                
                console.log(student)
            }catch({ message }){
                console.log(message)
            }
        }
        
        retrieveStudent(studentId)
    } , [])
    
    function handleSubmit(event){
        event.preventDefault()
        handleUpdate(studentId , _name , _surname , _birthdate , _healthcard)
    }

    async function handleUpdate(studentId , _name , _surname , birthdate , healthcard){
        try{
            const response = await logic.updateStudent(studentId , _name , _surname , birthdate , healthcard)
            history.push("/update-success")
        }catch({ message }){
            setResult("El procés no s'ha pogut completar. Torni-ho a intentar.")
        }
    }

    return  <div>
                <h1>Formulari d'actualització</h1>
                {student && 
                    <form onSubmit={handleSubmit} className="form">
                        <fieldset>
                            <legend className="legend legend__user">
                            Dades de l'inscrit/a
                            </legend>
                            <section className="fieldset__body">
                                <label htmlFor="name">Nom</label>
                                    <input className="input__form" type="text" name="name" value={_name} onChange={ event => setName(event.target.value)}/>
                                <label htmlFor="surname">Cognoms</label>
                                    <input className="input__form" type="text" name="surname" value={_surname} onChange={ event => setSurname(event.target.value)}/>
                                <label htmlFor="birthdate">Data de naixement</label>
                                    <input className="input__form" type="text" name="birthdate" value={_birthdate} onChange={ event => setBirthdate(event.target.value)}/>
                                <label htmlFor="healthcard">Targeta sanitària</label>
                                    <input className="input__form" type="text" name="healthcard" value={_healthcard} onChange={ event => setHealthcard(event.target.value)}/>
                            </section>
                        </fieldset>
                        <button className="btn">Actualitza les dades</button>
                    </form>
                }
                
                {!student && <p className='feedback--warning'>Hi ha hagut un problema amb la connexió. Torni endarrere per reprendre el procés d'actualització de dades.</p>}
                
                {result && <Feedback message={result}/>}
                <Link className="btn" to="/home">Torna</Link>
                </div>
            }

            export default withRouter(UpdateStudent)
    
              
