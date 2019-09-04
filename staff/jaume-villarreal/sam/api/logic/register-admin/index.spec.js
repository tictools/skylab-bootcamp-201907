require('dotenv').config()
const { expect } = require('chai')

const { env : { DB_URL_TEST } } = process
const { database , models : { Admin , Activity }} = require('data')
const { random : { value } } = require('utils')

const registerAdmin = require('.')

describe.only("logic - register admin" , ()=>{
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
        email = `admin-email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await Admin.deleteMany()
    })

    it('should succeed on correct data' , async ()=>{
        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id
        
        const result = await registerAdmin(name , surname , dni , accreditation , age , role , activity , email , password)
        expect(result).to.exist
        
        const admin = await Admin.findOne({ email })

        debugger

        expect(admin).to.exist
        expect(admin.name).to.equal(name)
        expect(admin.surname).to.equal(surname)
        expect(admin.dni).to.equal(dni)
        expect(admin.accreditation).to.equal(accreditation)
        expect(admin.age).to.equal(age)
        expect(admin.role).to.equal(role)
        expect(admin.activity.toString()).to.equal(activityId)
        expect(admin.email).to.equal(email)
        expect(admin.password).to.equal(password)        
    })
    
    it('should fail on unexisting activity' , async ()=>{
        activity = "Casal handbol"
        try{
            await registerAdmin(name , surname , dni , accreditation , age , role , activity , email , password)
        }catch({ message }){
            expect(message).to.equal(`activity ${activity} does not exist`)
        }   
    })

    it("should fail on  existing admin" , async () => {
        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id

        await Admin.create({ name , surname , dni , accreditation , age , role , activity : activityId , email , password })

        try{
            await registerAdmin(name , surname , dni , accreditation , age , role , activity , email , password)
        }catch({ message }){
            expect(message).to.equal(`admin with email ${email} already exists`)
        }
    })

    after(database.disconnect())
})