const { models : { Tutor } } = require('data')
const { validate } = require('utils')

/**
 * Updates a tutor.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, body) {
    validate.string(id , 'id')

    return(async ()=>{
        const tutor = await Tutor.findById(id)

        if (!tutor) throw new Error(`tutor with id ${id} does not exist`)
 
        return await Tutor.updateOne({ _id : id } , { $set: body })
    })()
}