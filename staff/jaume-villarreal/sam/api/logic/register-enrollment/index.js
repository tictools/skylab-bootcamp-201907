const { validate } = require('utils')
const { models : { Activity , Course , Enrollment , Student , Week } } = require('data')

/**
 * Register a enrollment
 * 
 * @param {String} school 
 * @param {String} group 
 * @param {String} shirt 
 * @param {String} allergy 
 * @param {String} illness 
 * @param {String} medication 
 * @param {String} observations 
 * @param {Boolean} imageAuth 
 * @param {Boolean} excursionAuth 
 * @param {String} activity 
 * @param {String} studentId 
 * @param {String} weekOption1 
 * @param {Boolean} morningPerm1 
 * @param {Boolean} afternoonPerm1 
 * @param {Boolean} lunch1 
 * @param {String} weekOption2 
 * @param {Boolean} morningPerm2 
 * @param {Boolean} afternoonPerm2 
 * @param {Boolean} lunch2 
 * @param {String} weekOption3 
 * @param {Boolean} morningPerm3 
 * @param {Boolean} afternoonPerm3 
 * @param {Boolean} lunch3
 * @param {String} weekOption4 
 * @param {Boolean} morningPerm4 
 * @param {Boolean} afternoonPerm4 
 * @param {Boolean} lunch4 
 */
module.exports =function( school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4){

    validate.string(school , "school")
    validate.string(group , "group")
    validate.string(shirt , "shirt")
    validate.string(allergy , "allergy")
    validate.string(illness , "illness")
    validate.string(medication , "medication")
    validate.string(observations , "observations")
    validate.boolean(imageAuth , "image authorization")
    validate.boolean(excursionAuth , "excursion authorization")
    validate.string(activity , "activity")
    validate.string(studentId , "student")
    validate.string(weekOption1 , "week option 1")
    validate.boolean(morningPerm1 , "morning perm 1")
    validate.boolean(afternoonPerm1 , "afternoon perm 1")
    validate.boolean(lunch1 , "lunch 1")
    validate.string(weekOption2 , "week option 2")
    validate.boolean(morningPerm2 , "morning perm 2")
    validate.boolean(afternoonPerm2 , "afternoon perm 2")
    validate.boolean(lunch2 , "lunch 2")
    validate.string(weekOption3 , "week option 3")
    validate.boolean(morningPerm3 , "morning perm 3")
    validate.boolean(afternoonPerm3 , "afternoon perm 3")
    validate.boolean(lunch3 , "lunch 3")
    validate.string(weekOption4 , "week option 4")
    validate.boolean(morningPerm4 , "morning perm 4")
    validate.boolean(afternoonPerm4 , "afternoon perm 4")
    validate.boolean(lunch4 , "lunch 4")

    return( async ()=>{
        const _activity = await Activity.findOne({ name : activity })
        if(!_activity) throw new Error (`activity with value ${activity} does not exist`)
        const activityId = _activity.id

        const student = await Student.findOne({ _id : studentId })
        if(!student) throw new Error (`student with id ${studentId} does not exist`)
        
        const enrollment = await new Enrollment({ school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth , activityId , student : studentId })

        if(weekOption1) {
            const week1 = await Week.create({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
            enrollment.weeks.push(week1)
        }

        if(weekOption2) {
            const week2 = await Week.create({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
            enrollment.weeks.push(week2)
        }
        
        if(weekOption3) {
            const week3 = await Week.create({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3 , lunch : lunch3 })
            enrollment.weeks.push(week3)
        }
        
        if(weekOption4) {
            const week4 = await Week.create({number : 4 , category : weekOption4 , morningPermanence : morningPerm4 , afternoonPermanence : afternoonPerm4 , lunch : lunch4 })
            enrollment.weeks.push(week4)
        }
        
        // for(let i = 1 ; i<=4 ; i++){
        //     if(`weekOption${i}`){
        //         const week = await Week.create({number : i , category : `weekOption${i}` , morningPermanence : `morningPerm${i}` , afternoonPermanence : `afternoonPerm${i}` , lunch : `lunch${i}` })
        //         enrollment.weeks.push(week)
        //     }
        // }
        await enrollment.save()

        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() 
        const course = Course.findOne({ year : currentYear})
        
        course.enrollments.push(enrollment.id)
        await course.save()

        return { }
    })()
}