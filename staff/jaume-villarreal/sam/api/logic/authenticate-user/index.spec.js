require ('dotenv').config()
const { expect } = require('chai')

const { database , models : { User }} = require('data')
// const { random : { value } } = require('utils')

const authenticateUser = require('.')

const { env : { DB_URL_TEST } } = process

describe("logic - authenticate user" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , email , password , userId


    beforeEach( async ()=> {
        email = `user-email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create(name , surname , dni , accreditation , age , role , activity , email , password)
        userId = user.id
    })

    it('should succeed on correct data' , async()=>{
        const id = await authenticateUser(email , password)
        expect(id).to.exist
        expect(id).to.equal(userId)
    })

    it('should fail on unexisting user' , async()=>{
        try{
            await authenticateUser("unexisting@mail.com" , password)
        }catch({ message }){
            expect(message).to.equal(`user with email unexixting@mail.com does not exist`)
        }
    })
    
    it('should fail on wrong credentials' , async()=>{
        try{
            await authenticateUser(email , '123')
        }catch({ message }){
            expect(message).to.equal("wrong credentials")
        }
    })

    after(database.disconnect())
})