import React , { useState } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from "../Feedback"

import logic from "../../logic"

import { Link } from "react-router-dom"

function RegisterStudent({ history }){
    
    const [result , setResult] = useState(undefined) // encén feedback panel
    
    function handleSubmit(event){
        event.preventDefault()
        const { target : { name : { value : name } , surname : { value : surname } , birthdate : { value : birthdate } , healthcard : { value : healthcard } } } = event
        handleUpdate(name , surname , birthdate , healthcard)
    }

    async function handleUpdate(name , surname , birthdate , healthcard){
        try{
            await logic.registerStudent(name , surname , birthdate , healthcard)
            history.push("/process-success")
        }catch({ message }){
            setResult("El procés no s'ha pogut completar. Torni-ho a intentar.")
        }
    }

    return  <div>
                <h1>Formulari de registre</h1>
                
                    <form onSubmit={handleSubmit} className="form">
                        <fieldset>
                            <legend className="legend legend__user">
                            Registra un nou usuari
                            </legend>
                            <section className="fieldset__body">
                                <label htmlFor="name">Nom</label>
                                    <input className="input__form" type="text" name="name" />
                                <label htmlFor="surname">Cognoms</label>
                                    <input className="input__form" type="text" name="surname" />
                                <label htmlFor="birthdate">Data de naixement</label>
                                    <input className="input__form" type="text" name="birthdate" />
                                <label htmlFor="healthcard">Targeta sanitària</label>
                                    <input className="input__form" type="text" name="healthcard" />
                            </section>
                        </fieldset>
                        <button className="btn">Registra</button>
                    </form>
                   
                {result && <Feedback message={result}/>}
                <Link className="btn" to="/home">Torna</Link>
            </div>
}

export default withRouter(RegisterStudent)
    
              
