// import retrieveUser from './retrieve-user'
import authenticateTutor from './authenticate-tutor'
import registerTutor from './register-tutor'
import isUserLogged from './is-user-logged'
import translateError from './translate-errors'

export default {
    
    set userCredentials({id , token}){
        sessionStorage.token = token
        sessionStorage.id = id
    },
    
    get userCredentials(){
        return { id: sessionStorage.id , token: sessionStorage.token }
    },
    translateError,
    isUserLogged, registerTutor, authenticateTutor
    // retrieveUser,
}
      
      