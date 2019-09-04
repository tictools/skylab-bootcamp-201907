require ('dotenv').config()
const { expect } = require('chai')

const { database , models : { Tutor , Student }} = require('data')
// const { random : { value } } = require('utils')

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
        phone = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        _name = `name-${Math.random()}`
        _surname = `surname-${Math.random()}`
        birthdate = `dni-${Math.random()}`
        healtcard = `phone-${Math.random()}`

        await Student.deleteMany()
        await Tutor.deleteMany()

        const tutor = await Tutor.create(name , surname , dni , phone ,  email , password)
        userId = user.id
    })

    it('should succeed on correct data' , async()=>{
       
    })

    after(database.disconnect())
})