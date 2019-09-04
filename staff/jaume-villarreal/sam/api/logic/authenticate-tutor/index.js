const { validate } = require('utils')
const { models : { Tutor } } = require('data')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */

module.exports =  function(email , password){
    validate.string(email , 'email')
    validate.email(email , 'email')
    validate.string(password , 'password')
    
    return( async()=> {
        const tutor = await Tutor.findOne({ email })

        if(!tutor) throw new Error (`tutor with email ${email} does not exist`)

        if(tutor.password !== password) throw new Error ('wrong credentials')
        
        return tutor.id
    })()
}