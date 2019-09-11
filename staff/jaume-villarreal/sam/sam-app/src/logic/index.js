// import retrieveUser from './retrieve-user'
import authenticateTutor from './authenticate-tutor'
import registerTutor from './register-tutor'
import retrieveTutor from './retrieve-tutor'
import retrieveStudentsByTutor from './retreive-students-by-tutor'
import isUserLoggedIn from './is-user-logged-in'
import isUserLoggedOut from './is-user-logged-out'
import translateError from './translate-errors'

export default {
    
    set userCredentials(token){
        sessionStorage.token = token
    },
    
    get userCredentials(){
        return sessionStorage.token 
    },
    
    translateError, isUserLoggedIn , isUserLoggedOut ,
    registerTutor, authenticateTutor , retrieveTutor , 
    retrieveStudentsByTutor
}
      
      