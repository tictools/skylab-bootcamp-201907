const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../data')
const { Card } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

     let name, surname, email, password , number , date

    beforeEach(() => {
        name = `John-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        number = Math.random()
        expiration = new Date()

        return User.deleteMany()
            .then(() => User.create({ name , surname , email , password }))
            .then(user => userId = user.id)
    })

    it('should succeed on correct data', () =>
        logic.registerCard(userId , number , expiration)
            .then(cardId => {
                expect(cardId).to.exist
                return User.findById({ _id :userId })
            })
            .then(user => {
                expect(user.cards.length).to.equal(1)
                expect(user.cards[0].number).to.equal(number)
                
                expect(user.cards[0].expiration).to.deep.equal(expiration)
            })
    )
    
    it('should fail on unexisting user' , () =>
        logic.registerCard('5d5d5530531d455f75da9fF9' , number , expiration)
            .catch( ({ message }) => expect(message).to.equal(`user with id 5d5d5530531d455f75da9fF9 does not exist`))
    )

    it('should fail on existing card' ,  () => 
        logic.registerCard(userId , number , expiration)
            .then(() => logic.registerCard(userId , number , expiration))
                .catch(({ message }) => expect(message).to.equal('card already exists'))
    )

    after(() => mongoose.disconnect())
})