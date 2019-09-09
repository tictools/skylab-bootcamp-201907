import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import registerTutor from './register-tutor'
import isUserLogged from './is-user-logged'

export default {
    set userCredentials({id,token}){
        sessionStorage.token = token
        sessionStorage.id = id
    },

    get userCredentials(){
        return { id: sessionStorage.id , token: sessionStorage.token }
    },
    
    registerTutor,
    authenticateUser,
    retrieveUser,
    isUserLogged
}
      
      