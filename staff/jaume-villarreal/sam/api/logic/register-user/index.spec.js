require('dotenv').config()
const { expect } = require('chai')

const { env : { DB_URL_TEST } } = process
const { database , models : { User , Activity }} = require('data')
const { random : { value } } = require('utils')

const registerUser = require('.')

describe.only("logic - register user" , ()=>{
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , dni , accreditation , age , role , activity , email , password , activityId

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
    })

    it('should succeed on correct data' , async ()=>{
        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id
        
        const result = await registerUser(name , surname , dni , accreditation , age , role , activity , email , password)
        expect(result).to.exist
        
        const user = await User.findOne({ email })

        debugger

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.dni).to.equal(dni)
        expect(user.accreditation).to.equal(accreditation)
        expect(user.age).to.equal(age)
        expect(user.role).to.equal(role)
        expect(user.activity.toString()).to.equal(activityId)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)        
    })
    
    it('should fail on unexisting activity' , async ()=>{
        activity = "Casal handbol"
        try{
            await registerUser(name , surname , dni , accreditation , age , role , activity , email , password)
        }catch({ message }){
            expect(message).to.equal(`activity ${activity} does not exist`)
        }   
    })

    it("should fail on  existing user" , async () => {
        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id

        await User.create({ name , surname , dni , accreditation , age , role , activity : activityId , email , password })

        try{
            await registerUser(name , surname , dni , accreditation , age , role , activity , email , password)
        }catch({ message }){
            expect(message).to.equal(`user with email ${email} already exists`)
        }
    })

    after(database.disconnect())
})