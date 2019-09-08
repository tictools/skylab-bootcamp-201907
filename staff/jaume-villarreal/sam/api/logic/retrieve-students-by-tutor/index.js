const { models : { Tutor , Student } } = require('data')
const { validate } = require('utils')

/**
 * Retrieves all students by tutor id.
 * 
 * @param {string} tutorId 
 * 
 * @returns {Promise}
 */

 module.exports = function( tutorId ){
    validate.string(tutorId , "tutor id")

    return(async () => {
        const tutor = Tutor.findOne({ _id : tutorId })

        if(!tutor) throw new Error (`tutor with id ${tutorId} does not exist`)

        const students = await Student.find({ tutor : tutorId })

        return students
    })()
 }