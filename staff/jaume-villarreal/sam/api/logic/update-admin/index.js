const { models : { Admin } } = require('data')
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
        const admin = await Admin.findById(id)
    
        if (!admin) throw new Error(`admin with id ${id} does not exist`)
    
        return await Admin.updateOne({ _id : id } , { $set: body })
    })()
}