const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, password) {
    validate.string(name , 'name')
    validate.string(surname , 'surname')
    validate.string(email , 'email')
    validate.email(email , 'email')
    validate.string(password , 'password')

    return(async () =>{
        const user = await User.findOne({ email })
        
        if (user) throw new Error(`user already exists`)

        await User.create({ name, surname, email, password })
         
        return { }
    })()
}