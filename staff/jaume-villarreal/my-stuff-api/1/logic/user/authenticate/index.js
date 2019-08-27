const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */
module.exports = function (email, password) {
    validate.string(email , 'email')
    validate.email(email , 'email')
    validate.string(password , 'password')

    return(async () =>{
        const user = await User.findOne({ email })
            
        if (!user) throw new Error(`user with e-mail ${email} does not exist`)
        
        if (user.password !== password) throw new Error('wrong credentials')

        return await user.id
    })()
}