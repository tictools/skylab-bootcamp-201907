const mongoose = require('mongoose')
const {  Types: { ObjectId } }  = mongoose
const { expect } = require('chai')
const { User , Card } = require('../../../data')
const logic = require('../../.')

describe('logic - retrieve card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name , surname , email , password , number , expiration , userId , cardId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        number = Math.random()
        expiration = new Date()

        await User.deleteMany()

        const user = await User.create({ name , surname , email , password })
        userId = user.id
        
        const card = await new Card({ userId , number , expiration })
        cardId = card.id
        user.cards.push(card)

        return await user.save()
    })

    it("should succeed on correct data" , async () => {
        const card = await logic.retrieveCard(userId , cardId)
        expect(card).to.exist
        expect(card.id).to.equal(cardId)
        expect(card.number).to.equal(number)
        expect(card.expiration).to.deep.equal(expiration)
    })

    it("should fail on unexisting user" , () => {
        expect(async () => {
            await logic.retrieveCard('5d5d5530531d455f75da9fF9' , cardId).should.be.rejected()
        })
    })
    
    it("should fail on unexisting user" , async () => {
        try{
            await logic.retrieveCard('5d5d5530531d455f75da9fF9' , cardId)
        } catch({ message }){
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it("should fail on unexisting card" , async () => {
        try {
            await logic.retrieveCard(userId , '5d5d5530531d455f75da9fF9')
        } catch({ message }) {
            expect(message).to.equal('card with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it('should fail on empty user id', () => 
        expect(() => logic.retrieveCard("" , cardId)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.retrieveCard(123 , cardId)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty card id', () => 
        expect(() => logic.retrieveCard(userId , "")).to.throw('card id is empty or blank')
    )
    
    it('should fail on wrong card id type', () => 
        expect(() => logic.retrieveCard(userId , 123)).to.throw('card id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})