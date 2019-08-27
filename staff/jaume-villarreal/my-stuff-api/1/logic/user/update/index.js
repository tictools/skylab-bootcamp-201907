const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    validate.string(id , 'id')
    // validate.string(data , 'data')

    return(async ()=>{
        const user = await User.findById(id)
        if (!user) throw new Error(`user with id ${id} does not exist`)
        return await User.updateOne({ _id : id } , { $set: data })
    })()
}