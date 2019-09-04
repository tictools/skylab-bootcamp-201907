const { validate } = require('utils')
const { models : { Tutor } } = require('data')

/**
 * Register a student
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} dni 
 * @param {string} phone1
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */

 module.exports = function(name , surname , dni , phone1 ,  email , password) {
     validate.string(name , "name")
     validate.string(surname , "surname")
     validate.string(dni , "dni")
     validate.string(phone1 , "phone1")
     validate.string(email , "email")
     validate.email(email , "email")
     validate.string(password , "password")

     return(async ()=>{
        const tutor = await Tutor.findOne({ email })
         
        if(tutor) throw new Error (`tutor with email ${email} already exists`)

        await Tutor.create({ name , surname , dni , phone1 , email , password })

        return { }
     })()
 }