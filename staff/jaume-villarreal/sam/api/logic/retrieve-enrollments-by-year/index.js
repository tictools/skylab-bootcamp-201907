const { validate } = require('utils')
const { models : { Enrollment , Course } } = require('data')

module.exports = function(year){
    validate.number(year , 'course')

    const course = Course.findOne({ year })

    if(!course) throw new Error (`course ${year} does not exist `)

    const enrollments = Enrollment.find({ year })

    return enrollments
}
