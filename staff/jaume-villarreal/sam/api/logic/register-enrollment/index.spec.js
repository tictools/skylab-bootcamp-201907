require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { expect } = require('chai')

const { database , models : { Student , Tutor  } } = require('data')
const { random : { boolean , value } } = require('utils')
const registerStudent = require('.')


describe('logic - register student' , ()=>{
    before( () => database.connect(DB_URL_TEST))

    let name , surname , birthdate , healtcard , tutorId

    beforeEach( async () => {

        tutorName = `tutor-name-${Math.random()}`
        tutorSurname = `tutor-surname-${Math.random()}`
        tutorDNI = `tutor-dni-${Math.random()}`
        phone1 = `phone1-${Math.random()}`
        phone2 = `phone2-${Math.random()}`
        email = `tutor-email-${Math.random()}@mail.com`

        studentName = `student-name-${Math.random()}`
        studentSurname = `student-surname-${Math.random()}`
        birthdate = new Date()
        healthcard  = `healtcard-${Math.random()}`

        school  = `school-${Math.random()}`
        group  = `group-${Math.random()}`
        shirt  = `shirt-${Math.random()}`
        allergy  = `allergy-${Math.random()}`
        illness  = `illness-${Math.random()}`
        medication  = `medication-${Math.random()}`
        observations  = `observations-${Math.random()}`
        imageAuth = boolean()
        excursionAuth = boolean()

        activity  = value("Casalet EI" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus de Futbol" , "Campus de Bàsquet" , "Campus de Judo")

        week1 = {
            "category": value('part' , "full"),
            "morningPermanence": boolean(),
            "afternooonPermanence": boolean(),
            "lunch": boolean()
        }
        week2 = {
            "category": value('part' , "full"),
            "morningPermanence": boolean(),
            "afternooonPermanence": boolean(),
            "lunch": boolean()
        }
        week3 = {
            "category": value('part' , "full"),
            "morningPermanence": boolean(),
            "afternooonPermanence": boolean(),
            "lunch": boolean()
        }
        week4 = {
            "category": value('part' , "full"),
            "morningPermanence": boolean(),
            "afternooonPermanence": boolean(),
            "lunch": boolean()
        }

        await Student.deleteMany()
        await Tutor.deleteMany()
        await Enrollment.deleteMany()
    })

    it("should succeed on correct data" , async ()=> {
        const idStudent = await registerStudent(tutorName, tutorSurname, tutorDNI, phone1 , phone2, email , studentName , studentSurname , birthdate , shirt , school , group , healthcard , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , week1 , week2 , week3 , week4)

        expect(idStudent).to.exist

        const student = await Student.findOne({ _id : idStudent })

        expect(student.name).to.equal(studentName)
        expect(student.surname).to.equal(studentSurname)
        expect(student.birthdate).to.equal(birthdate)

        const tutor = await Tutor.findOne({ student : idStuden })

        expect(tutor.name).to.equal(tutorName)
        expect(tutor.surname).to.equal(tutorSurname)
        expect(tutor.dni).to.equal(tutorDNI)
        expect(tutor.phone1).to.equal(phone1)
        expect(tutor.phone2).to.equal(phone2)
        expect(tutor.email).to.equal(email)

        const enrollment = Enrollment.findOne({ student : idStudent })

        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.healthcard).to.equal(healthcard)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.activity).to.equal(activity)

        expect(enrollment.week1).to.deep.equal(week1)
        expect(enrollment.week2).to.deep.equal(week2)
        expect(enrollment.week3).to.deep.equal(week3)
        expect(enrollment.week4).to.deep.equal(week4)
    })
    
    after(database.disconnect())
})