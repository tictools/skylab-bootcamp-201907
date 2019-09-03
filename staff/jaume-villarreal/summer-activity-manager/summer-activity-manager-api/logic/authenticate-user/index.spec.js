require ('dotenv').config()

const { expect } = require('chai')
const { database , models : { User }} = require('../../data')
const { boolean , value } = require('../../utils/random')
const authenticateUser = require('.')

const { env : { DB_URL_TEST } } = process

describe("logic - authenticate user" , ()=>{
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , email , password , userId

    beforeEach( async ()=> {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        accreditation = `accreditation-${Math.random()}`
        age = Math.random()
        role = value(0,1)
        activity  = value("Casalet EI" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus de Futbol" , "Campus de Bàsquet" , "Campus de Judo")
        email = `user-email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = User.create(name , surname , dni , accreditation , age , role , activity , email , password)
        userId = user.id
    })

    it('should succeed on correct data' , async ()=>{
        const id = await authenticateUser(email , password)
        expect(id).to.exist
        expect(id).to.equal(userId)
    })
})