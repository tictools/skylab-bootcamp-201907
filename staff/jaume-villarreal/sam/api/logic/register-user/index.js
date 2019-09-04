const { validate } = require('utils')
const { models : { User , Activity }} = require('data')


/**
 * Register a student
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} dni 
 * @param {string} accreditation 
 * @param {Number} age 
 * @param {Number} role 
 * @param {string} activity
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */

 module.exports = function(name , surname , dni , accreditation , age , role , activity , email , password) {
     validate.string(name , "name")
     validate.string(surname , "surname")
     validate.string(dni , "dni")
     validate.string(accreditation , "accreditation")
     validate.number(age , "age")
     validate.number(role , "role")
     validate.string(activity , "activity")
     validate.string(email , "email")
     validate.email(email , "email")
     validate.string(password , "password")

     rerturn(async ()=> {
         const user = await User.findOne({ email })

         if(user) throw new Error (`user with email ${email} already exists`)

         const _activity = await Activity.findOne({ name : activity })

         if (!activity) throw new Error (`activity ${activity} does not exist`)

         const activityId = activity.id

         await User.create({ name , surname , dni , accreditation , age , role , activityId , email , password })

         return { } 
     })()
 }