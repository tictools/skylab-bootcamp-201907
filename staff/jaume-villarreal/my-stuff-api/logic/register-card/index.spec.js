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
            .then(() => Card.deleteMany())
            .then(() => User.create({ name , surname , email , password }))
            .then(user => userId = user.id)
    })

    it('should succeed on correct data', () =>
        logic.registerCard(userId , number , expiration)
            .then(() => User.findById({ _id :userId }).populate('cards'))
            .then(user => {
                expect(user.cards.length).to.equal(1)
                // expect(user.cards[0].number).to.equal(number)
                // expect(user.cards[0].expiration).to.equal(date)
            })
    )
    
    // it('should fail on unexisting user', () =>
    //     logic.registerProperty('123' , address , m2 , year , cadastre)
    //         .catch( ({ message}) => expect(message).to.equal('user with email 123 does not exist'))
    // )

    after(() => mongoose.disconnect())
})