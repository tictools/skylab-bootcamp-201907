const { validate } = require('utils')
const { models : { Admin } } = require('data')

/**
 * Authenticates an admin by its credentials.
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
        const admin = await Admin.findOne({ email })

        if(!admin) throw new Error (`admin with email ${email} does not exist`)

        if(admin.password !== password) throw new Error ('wrong credentials')
        
        return admin.id
    })()
}