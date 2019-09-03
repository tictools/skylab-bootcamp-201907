const { validate } = require('utils')
const { models : { Student , Tutor , Enrollment , Activity , Course }} = require('data')

/**
 * Register a student
 * 
 * @param {string} tutorName 
 * @param {string} tutorSurname 
 * @param {string} tutorDNI 
 * @param {string} phone1 
 * @param {string} phone2 
 * @param {string} email 
 * @param {string} studentName 
 * @param {string} studentSurname 
 * @param {date} birthdate
 * @param {string} shirt
 * @param {string} school
 * @param {string} group
 * @param {string} healthcard
 * @param {string} allergy
 * @param {string} illness
 * @param {string} medication
 * @param {string} observations
 * @param {boolean} imageAuth
 * @param {boolean} excursionAuth
 * @param {string} activity
 * @param {Array} week1
 * @param {Array} week2
 * @param {Array} week3
 * @param {Array} week4
 */
module.exports =function(tutorName, tutorSurname, tutorDNI, phone1 , phone2, email , studentName , studentSurname , birthdate , shirt , school , group , healthcard , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , week1 , week2 , week3 , week4 ){
    validate.string(tutorName , "tutor name")
    validate.string(tutorSurname , "tutor surname") 
    validate.string(tutorDNI , "dni") 
    validate.string(phone1 , "phone 1") 
    validate.string(phone2 , "phone2") 
    validate.string(email , "email")  
    validate.email(email , "email")  
    validate.string(studentName , "student name") 
    validate.string(studentSurname , "student surname") 
    validate.date(birthdate , "bitrh date")
    validate.string(shirt , "shirt")
    validate.string(school , "school")
    validate.string(group , "group")
    validate.string(healthcard , "health card")
    validate.string(allergy , "allergy")
    validate.string(illness , "illness")
    validate.string(medication , "medication")
    validate.string(observations , "observations")
    validate.boolean(imageAuth , "image authorization")
    validate.boolean(excursionAuth , "excursion authorization")
    validate.string(activity , "activity")
    validate.array(week1 , "week 1")
    validate.array(week2 , "week 2")
    validate.array(week3 , "week 3")
    validate.array(week4 , "week 4")

    return( async ()=>{
        const currentdate = new Date()
        const year = currentdate.getFullYear()
        const course = await Course.findOne({ year })

        const tutor = await new tutor({name : tutorName , surname : tutorSurname , dni : tutorDNI , phone1 , phone2 , email })
        const student = await new Student({ name : studentName , surname : studentSurname , birthdate , healthcard })
        const enrollment = await new Enrollment({ school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth })

        tutor.student = student.id
        student.tutor = tutor.id
        enrollment.activity = activity.id
        enrollment.tutor = tutor.id
        enrollment.student = student.id
        enrollment.weeks.push(week1 , week2 , week3 , week4)
        course.enrollments.push(enrollment)
        await tutor.save()
        await student.save()
        await enrollment.save()
        await course.save()
    })()
}