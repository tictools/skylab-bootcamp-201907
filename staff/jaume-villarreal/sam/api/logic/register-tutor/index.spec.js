require ('dotenv').config()
const { expect } = require('chai')

const { database , models : { Tutor , Student }} = require('data')

const registerTutor = require('.')

const { env : { DB_URL_TEST } } = process

describe("logic - register tutor" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , dni , phone , email
    let _name , _surname , birthdate , healthcard , tutor
    let tutorId , studentId

    beforeEach( async ()=> {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        _name = `name-${Math.random()}`
        _surname = `surname-${Math.random()}`
        birthdate = `birthdate-${Math.random()}`
        healthcard = `phone-${Math.random()}`

        await Student.deleteMany()
        await Tutor.deleteMany()
    })

    it('should succeed on correct data' , async()=>{
        const tutor = await registerTutor( name , surname , dni , phone1 ,  email , password )

        expect(result).to.exist
        expect(tutor.id).to.exist
        expect(tutor.name).to.equal(name)
        expect(tutor.surname).to.equal(surname)
        expect(tutor.dni).to.equal(dni)
        expect(tutor.email).to.equal(email)
        expect(tutor.pasword).to.equal(password)

        
        const newStudent = await Student.create({ name : _name , surname : _surname , birthdate , healthcard , tutorId })
        studentId = newStudent.id
    
        const student = await Student.findById(studentId)
        expect(student.tutor).to.equal(tutorId)
    })

    it("should fail on  existing tutor" , async () => {
        await Tutor.create({ name , surname , dni , phone1 ,  email , password })
        try{
            await registerTutor(name , surname , dni , phone1 ,  email , password)
        }catch({ message }){
            expect(message).to.equal(`tutor with email ${email} already exists.`)
        }
    })

    after(database.disconnect())
})