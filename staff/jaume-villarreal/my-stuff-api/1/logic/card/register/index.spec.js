const mongoose = require('mongoose')
const { expect } = require('chai')
const { User , Card } = require('../../../data')
const logic = require('../../.')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

     let name, surname, email, password , number , date

    beforeEach(async () => {
        name = `John-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        number = Math.random()
        expiration = new Date()

        await User.deleteMany()
        const user = await User.create({ name , surname , email , password })
        userId = user.id
    })

    it('should succeed on correct data', async () =>{
        const cardId = await logic.registerCard(userId , number , expiration)
        expect(cardId).to.exist
        
        const user = await User.findById({ _id :userId })
        expect(user.cards.length).to.equal(1)
        expect(user.cards[0].number).to.equal(number)
        expect(user.cards[0].expiration).to.deep.equal(expiration)
    })
    
    it('should fail on unexisting user' , () =>
        logic.registerCard('5d5d5530531d455f75da9fF9' , number , expiration)
            .catch( ({ message }) => expect(message).to.equal(`user with id 5d5d5530531d455f75da9fF9 does not exist`))
    )

    it('should fail on existing card' ,  () => 
        logic.registerCard(userId , number , expiration)
            .then(() => logic.registerCard(userId , number , expiration))
                .catch(({ message }) => expect(message).to.equal('card already exists'))
    )

    it('should fail on empty user id', () => 
        expect(() => logic.registerCard("" , number , expiration)).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () => 
        expect(() => logic.registerCard(123 , number, expiration)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty number', () => 
        expect(() => logic.registerCard(userId , "" , expiration)).to.throw('number is empty or blank')
    )

    it('should fail on wrong number type', () => 
        expect(() => logic.registerCard(userId , '123' , expiration)).to.throw('number with value 123 is not a number')
    )

    it('should fail on wrong date type', () => 
        expect(() => logic.registerCard(userId , number , 123)).to.throw('date with value 123 is not a date')
    )

    after(() => mongoose.disconnect())
})