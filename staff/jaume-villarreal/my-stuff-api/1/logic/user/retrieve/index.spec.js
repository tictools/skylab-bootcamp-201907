const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../../data')
const logic = require('../../.')

describe('logic - retrieve user', () => {
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
        const user = await logic.retrieveUser(id)
            expect(user).to.exist
            expect(user.id).to.equal(id)
            expect(user._id).not.to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).not.to.exist
    })

    it('should fail on a non existing user' , async () =>{
        id = '5d5d5530531d455f75da9fF9'
        try{
            await logic.retrieveUser(id)
        } catch({ message }){
            expect(message).to.equal(`user with id ${id} not found`)
        }
    })

    it('should fail on empty user id', () => 
        expect(() => logic.retrieveUser("")).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.retrieveUser(123)).to.throw('user id with value 123 is not a string'))

    after(() => mongoose.disconnect())
})