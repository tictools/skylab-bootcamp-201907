const { models : { Admin } } = require('data')
const bcrypt = require('bcryptjs')
const { validate } = require('utils')

/**
 * Updates an admin.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, body) {
    validate.string(id , 'id')

    return(async ()=>{
        const { name : _name , surname : _surname , dni : _dni , accreditation : _accreditation , age : _age , role : _role , activity  , email  , password } = body
        let activityId , hash

        const admin = await Admin.findById(id)
    
        if (!admin) throw new Error(`admin with id ${id} does not exist`)

        if(activity) {
            const _activity = Activity.findOne({ name : activity})
            activityId = _activity.id
        }

        if(password) hash = await bcrypt.hash(password,10)
    
        return await Admin.updateOne({ _id : id } , { $set:  {name : _name , surname : _surname , dni : _dni , accreditation : _accreditation, age : _age , role : _role , activity : activityId , email , password : hash} })
    })()
}