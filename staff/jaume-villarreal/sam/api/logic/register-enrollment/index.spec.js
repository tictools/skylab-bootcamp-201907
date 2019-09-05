require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { expect } = require('chai')

const { database , models : { Course , Enrollment , Student , Tutor } } = require('data')
const { random : { boolean , value } , formatDate} = require('utils')
const registerEnrollment = require('.')


describe.only('logic - register enrollment' , ()=>{
    before( () => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard , studentId
    let tutorName , tutorSurname , dni , phone1 , email, password , tutorId

    let school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth , activity
    
    let categories = ["empty" , "part" , "full"]
    
    let weekOption1 , morningPerm1 , afternoonPerm1 , lunch1
    let weekOption2 , morningPerm2 , afternoonPerm2 , lunch2
    let weekOption3 , morningPerm3 , afternoonPerm3 , lunch3
    let weekOption4 , morningPerm4 , afternoonPerm4 , lunch4

    let course

    beforeEach( async () => {
        // tutor data
        tutorName = `tutor-name-${Math.random()}`
        tutorSurname = `tutor-surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        // student data
        studentName = `student-name-${Math.random()}`
        studentSurname = `student-surname-${Math.random()}`
        birthdate = formatDate(new Date())
        healthcard  = `healtcard-${Math.random()}`

        // enrollment data
        school = `school-${Math.random()}`
        group = value("P3" , "P4" , "P5", "1EP" , "2EP" , "3EP" , "4EP" , "5EP" , "6EP" , "1ESO" , "2ESO" , "3ESO" , "4ESO")
        shirt = value("4" , "6" , "8", "10" , "12" , "XS" , "S" , "M" , "L" , "XL")
        allergy = `allergy-${Math.random()}`
        illness = `illness-${Math.random()}`
        medication = `medication-${Math.random()}`
        observations = `observations-${Math.random()}`
        imageAuth = boolean()
        excursionAuth = boolean()
        activity = value("Casalet EI" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")
        
        await Tutor.deleteMany()
        await Student.deleteMany()
        await Enrollment.deleteMany()

        const tutor = await Tutor.create({ name : tutorName , surname : tutorSurname , dni , phone1 , email , password })
        tutorId = tutor.id

        const student = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId})
        studentId = student.id

        let currentDate = new Date()
        let year = currentDate.getFullYear()
        const course = await Course.findOne({ year })
        debugger
        course.enrollments.length = 0
    })

    it("should succeed on correct data for first week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
        
        weekOption2 = "empty"
        morningPerm2 = false
        afternoonPerm2 = false
        lunch2 = false
       
        weekOption3 = "empty"
        morningPerm3 = false
        afternoonPerm3 = false
        lunch3 = false
        
        weekOption4 = "empty"
        morningPerm4 = false
        afternoonPerm4 = false
        lunch4 = false
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activity)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
    })
    
    after(database.disconnect())
})