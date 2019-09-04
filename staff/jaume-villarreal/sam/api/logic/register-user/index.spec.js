require ('dotenv').config()
const { expect } = require('chai')

const { env : { DB_URL_TEST } } = process
const { database , models : { User }} = require('data')
const { random : { value } } = require('utils')

const registerUser = require('.')

describe.only("logic - register user" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , dni , accreditation , age , role , activity , email , password
    let activityId , userId

    beforeEach( async ()=> {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        accreditation = `accreditation-${Math.random()}`
        age = Math.random()
        role = value(0,1)
        activity  = value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")
        email = `user-email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        activityId = await Activity.findOne({ name : activity })
    })

    it('should succeed on correct data' , async ()=>{
        const result = await registerUser(name , surname , dni , accreditation , age , role , activityId , email , password)
        expect(result).not.to.exist

        const user = await User.findOne({ email })
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.dni).to.equal(dni)
        expect(user.accreditation).to.equal(accreditation)
        expect(user.age).to.equal(age)
        expect(user.role).to.equal(role)


        
    })

    after(database.disconnect())
})