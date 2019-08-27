const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../../data')
const logic = require('../../.')

describe('logic - register user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () =>{
        const result = await logic.registerUser(name, surname, email, password)
        expect(result).to.exist

        const user = await User.findOne({ email })
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.equal(password)
    })

    it('should fail on exixting user' , async ()=>{
        await logic.registerUser(name, surname, email, password)
        try{
            await logic.registerUser(name, surname, email, password)
        } catch({ message }){
            expect(message).to.equal(`user already exists`)
        }
    })

    it('should fail on empty name', () => 
        expect(() => logic.registerUser("", surname, email, password)).to.throw('name is empty or blank')
    )
    
    it('should fail on wrong name type', () => 
        expect(() => logic.registerUser(123, surname, email, password)).to.throw('name with value 123 is not a string')
    )
    
    it('should fail on empty surname', () => 
        expect(() => logic.registerUser(name, "", email, password)).to.throw('surname is empty or blank')
    )
    
    it('should fail on wrong surname type', () => 
        expect(() => logic.registerUser(name, 123, email, password)).to.throw('surname with value 123 is not a string')
    )
    
    it('should fail on empty email', () => 
        expect(() => logic.registerUser(name, surname, "123@mailcom" , password)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )
    
    it('should fail on wrong email format', () => 
        expect(() => logic.registerUser(name, surname, "123@mailcom" , password)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )

    it('should fail on wrong email type', () => 
        expect(() => logic.registerUser(name, surname, 123, password)).to.throw('email with value 123 is not a string')
    )
    
    it('should fail on empty password', () => 
        expect(() => logic.registerUser(name, surname, email, "")).to.throw('password is empty or blank')
    )
    
    it('should fail on wrong password type', () => 
        expect(() => logic.registerUser(name, surname, email, 123 )).to.throw('password with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})