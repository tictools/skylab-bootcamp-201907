const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../../data')
const logic = require('../../.')


describe('logic - authenticate user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async () =>{
        const id = await logic.authenticateUser(email, password)
            expect(id).to.exist
            expect(id).to.be.a('string')
            expect(id).to.equal(id)
    })

    it("should fail on wrong mail" , async () =>{
        try{
            await logic.authenticateUser('123@mail.com', password)
        } catch({ message }){
            expect(message).to.equal('user with e-mail 123@mail.com does not exist')
        }
    })
    
    it("should fail on wrong password" , async () =>{
        try{
            await logic.authenticateUser(email, '123')
        } catch({ message }){
            expect( message ).to.equal('wrong credentials')
        }
    })

    it('should fail on empty email', () => 
        expect(() => logic.authenticateUser("" , password)).to.throw('email is empty or blank')
    )
    
    it('should fail on wrong email type', () => 
        expect(() => logic.authenticateUser("123" , password)).to.throw('email with value 123 is not a valid e-mail')
    )

    it('should fail on wrong password type', () => 
        expect(() => logic.authenticateUser(123 , password)).to.throw('email with value 123 is not a string')
    )
    
    it('should fail on empty password', () => 
        expect(() => logic.authenticateUser(email , "")).to.throw('password is empty or blank')
    )
    
    it('should fail on wrong password type', () => 
        expect(() => logic.authenticateUser(email , 123)).to.throw('password with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})