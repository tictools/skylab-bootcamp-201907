const mongoose = require('mongoose')
const {  Types: { ObjectId } }  = mongoose
const { expect } = require('chai')
const { User } = require('../../data')
const { Card } = require('../../data')
const logic = require('..')

describe('logic - unregister card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name , surname , email , password , number , expiration , userId , cardId

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        number = Math.random()
        expiration = new Date()

        return User.deleteMany()
            .then(() => User.create({ name , surname , email , password }))
            .then(user => {
                userId = user.id
                const card = new Card({ userId , number , expiration })
                cardId = card.id
                user.cards.push(card)
                return user.save()
            })
    })

    it("should succeed on correct data" , () => 
        logic.unregisterCard(userId , cardId)
            .then(result => {
                expect(result).not.to.exist
            })
    )

    it("should fail on unexisting user" , () => {
        logic.unregisterCard('5d5d5530531d455f75da9fF9' , cardId)
            .catch(({ message }) => expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist'))
    })

    it("should fail on unexisting card" , () => {
        logic.unregisterCard(userId , '5d5d5530531d455f75da9fF9')
            .catch(({ message }) => expect(message).to.equal('card with id 5d5d5530531d455f75da9fF9 does not exist'))
    })


    it('should fail on empty user id', () => 
        expect(() => logic.unregisterCard("" , cardId)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.unregisterCard(123 , cardId)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty card id', () => 
        expect(() => logic.unregisterCard(userId , "")).to.throw('card id is empty or blank')
    )
    
    it('should fail on wrong card id type', () => 
        expect(() => logic.unregisterCard(userId , 123)).to.throw('card id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})