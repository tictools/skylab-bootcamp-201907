const {validate} = require('utils')
const { models : { Enrollment } } = require('data')

/**
 * Retrieves an enrollment by its id.
 * 
 * @param {string} enrollmentId 
 * 
 * @returns {Promise}
 */
module.exports = function (enrollmentId) {

    validate.string(enrollmentId , 'enrollment id')

    return(async ()=>{
        const enrollment = await Enrollment.findOne({ _id : enrollmentId }, { _id: 0, __v:0 }).lean()
        
        if (!enrollment) throw new Error(`enrollment with id ${enrollmentId} not found`)

        enrollment.id = enrollmentId

        return enrollment
    })() 
}