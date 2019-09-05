require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { expect } = require('chai')

const { database , models : { Student , Tutor  } } = require('data')
const { random : { boolean , value } } = require('utils')
const registerStudent = require('.')


describe('logic - register student' , ()=>{
    before( () => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard
    let studenytId , tutorId
    let tutorName , tutorSurname , tutorDNI , phone1 , email, password

    beforeEach( async () => {
        studentName = `student-name-${Math.random()}`
        studentSurname = `student-surname-${Math.random()}`
        birthdate = new Date()
        healthcard  = `healtcard-${Math.random()}`

        tutorName = `tutor-name-${Math.random()}`
        tutorSurname = `tutor-surname-${Math.random()}`
        tutorDNI = `tutor-dni-${Math.random()}`
        phone1 = `phone1-${Math.random()}`
        email = `tutor-email-${Math.random()}@mail.com`
        password = `tutor-password-${Math.random()}`

        await Student.deleteMany()
        await Tutor.deleteMany()

        const tutor = tutor.create({ tutorName , tutorSurname , tutorDNI , phone1 , email, password })
        tutorId = tutor.id
    })
    
    it("should succeed on correct data" , async ()=> {
        const result = await registerStudent(studentName , studentSurname , birthdate , healthcard , tutorId )
        studenytId = result.id

        expect(result).to.exist

        const student = await Student.findOne({ _id : idStudent })

        expect(student.name).to.equal(studentName)
        expect(student.surname).to.equal(studentSurname)
        expect(student.birthdate).to.equal(birthdate)
        expect(student.healthcard).to.equal(healthcard)

        const tutor = await Tutor.findOne({ student : tutorId })

        expect(tutor.name).to.equal(tutorName)
        expect(tutor.surname).to.equal(tutorSurname)
        expect(tutor.dni).to.equal(tutorDNI)
        expect(tutor.phone1).to.equal(phone1)
        expect(tutor.phone2).to.equal(phone2)
        expect(tutor.email).to.equal(email)
    })
    
    after(database.disconnect())
})