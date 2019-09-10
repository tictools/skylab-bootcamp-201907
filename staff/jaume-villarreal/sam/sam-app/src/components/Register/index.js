import { Link , withRouter } from 'react-router-dom'
import logic from '../../logic'

import React , { useState } from 'react'

import Feedback from '../Feedback'

function Register({ history }){
    const  [error, setError]  = useState(undefined)

    function handleSubmit(event){
        event.preventDefault()
        const { target : { name : { value : name } , surname : { value : surname } , dni : { value : dni } , phone1 : { value : phone1 } , email : { value : email } , password : { value : password } , repassword : { value : repassword } }} = event
        debugger
        handleRegister(name , surname , dni , phone1 , email , password , repassword)
    }

    async function handleRegister(name , surname , dni , phone1 , email , password , repassword){
        try{
            const result = await logic.registerTutor(name , surname , dni , phone1 , email , password , repassword)
            history.push('/')
        }
        catch({ message }){
            console.log("error" , message)
            // debugger
            const translatedMessage = logic.translateError(message , email)
            setError(translatedMessage)
        }
    }

    return  <div>
                <form onSubmit = {handleSubmit} className="form form__register">
                    <fieldset className="fieldset fieldset__guardian">
                        <legend className="legend legend__guardian">
                            Dades del tutor
                        </legend>
                        <section className="fieldset__body">
                            <label htmlFor="name">Nom</label>
                                <input className="input__form" type="text" name="name"  />
                            <label htmlFor="surname">Cognoms</label>
                                <input className="input__form" type="text" name="surname"  />
                            <label htmlFor="dni">DNI</label>
                                <input className="input__form" type="text" name="dni"  />
                            <label htmlFor="phone1">Telèfon 1</label>
                                <input className="input__form" type="text" name="phone1"  />
                            <label htmlFor="email">Correu electrònic</label>
                                <input className="input__form" type="text" name="email"  />
                            <label htmlFor="password">Contrassenya</label>
                                <input className="input__form" type="password" name="password"  />
                            <label htmlFor="repassword">Confirma la contrassenya</label>
                                <input className="input__form" type="password" name="repassword"  />
                        </section>
                        <button>Registra't</button>
                    </fieldset>
                </form>
                <button><Link to="/">Torna</Link></button>

                {error !== undefined && <Feedback message ={error}/>}
                </div>
            }

export default withRouter(Register)
