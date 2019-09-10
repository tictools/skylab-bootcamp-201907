import React , {useState} from 'react'
import { Link , withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import logic from '../../logic'

function Login({ history }){
    const  [error, setError]  = useState()

    function handleSubmit(event){
        event.preventDefault()
        const { target : { email : { value : email } , password : { value : password } } } = event
        handleLogin(email , password)
    }

    async function handleLogin(email , password){
        try{
            const { message , id , token } = await logic.authenticateTutor(email , password)
            logic.userCredentials = {id , token}
            console.log("message" , message)
            console.log("id" , sessionStorage.id)
            console.log("token" , sessionStorage.token)
            history.push('/')
        }
        catch({ message }){
            let translatedMessage = logic.translateError(message , email)
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
                            <label htmlFor="email">Correu electrònic</label>
                                <input className="input__form" type="text" name="email"  />
                            <label htmlFor="password">Contrassenya</label>
                                <input className="input__form" type="password" name="password"  />
                        </section>
                        <button>Registra't</button>
                    </fieldset>
                </form>
                <button><Link to="/">Torna</Link></button>

                {error && <Feedback message ={error}/>}
            </div>
}

export default withRouter(Login)
