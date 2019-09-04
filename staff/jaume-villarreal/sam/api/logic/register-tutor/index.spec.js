require ('dotenv').config()
const { expect } = require('chai')

const { database , models : { Tutor }} = require('data')

const registerTutor = require('.')

const { env : { DB_URL_TEST } } = process

describe.only("logic - register tutor" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , dni , phone1 , email , password

    beforeEach( async ()=> {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        await Tutor.deleteMany()
    })

    it('should succeed on correct data' , async()=>{
        const result = await registerTutor( name , surname , dni , phone1 ,  email , password)
        expect(result).to.exist
        debugger

        const tutor = await Tutor.findOne({ email })
        debugger
        expect(tutor.id).to.exist
        expect(tutor.name).to.equal(name)
        expect(tutor.surname).to.equal(surname)
        expect(tutor.dni).to.equal(dni)
        expect(tutor.pohne1).to.equal(phone1)
        expect(tutor.email).to.equal(email)
        expect(tutor.pasword).to.equal(password)
    })

    // it("should fail on  existing tutor" , async () => {
    //     await Tutor.create({ name , surname , dni , phone1 ,  email , password })
    //     try{
    //         await registerTutor(name , surname , dni , phone1 ,  email , password)
    //     }catch({ message }){
    //         expect(message).to.equal(`tutor with email ${email} already exists.`)
    //     }
    // })

    after(database.disconnect())
})