const mongoose = require('mongoose')
const { expect } = require('chai')
const { User , Property } = require('../../../data')
const logic = require('../../.')

describe('logic - unregister property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId , userId2 , name , surname , email , password , propertyId , address , m2 , year , cadastre

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        address = `adress-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name , surname , email , password }))
            .then(user =>{
                userId = user.id
                return Property.deleteMany()
            })
            .then(() => {
                const property = new Property({ address, m2 , year , cadastre })
                propertyId = property.id
                property.owners.push(userId)
                return property.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.unregisterProperty(propertyId , userId)
            .then(result => Property.findOne({ propertyId }))
            .then(property => {
                expect(property).not.to.exist
            })
    )

    it('should fail on right cadastre and unexisting user', () =>
        logic.unregisterProperty(propertyId , '5d5d5530531d455f75da9fF9')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`user with id 5d5d5530531d455f75da9fF9 does not exist`))
    )

    it('should fail on existing user, but wrong property id', () =>{
        return logic.unregisterProperty('5d5d5530531d455f75da9fF9' , userId)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('property with id 5d5d5530531d455f75da9fF9 does not exist'))

    })
    
    it('should fail on existing more than one owner on property', () =>{
        return User.deleteMany()
            .then(() => User.create({ name , surname , email , password }))
            .then(user =>{
                userId = user.id
                return Property.deleteMany()
            })
            .then(() => {
                const property = new Property({ address, m2 , year , cadastre })
                property.owners.push(userId , '5d5d5530531d455f75da9fF9')
                return property.save()
            })
            .then(property => logic.unregisterProperty(property.id , userId))
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('invalid action: there are two or more owners for this property'))

    })

    it("should fail on unregistering a property by a user who is not an owner" , () => {
        let _name = `name-${Math.random()}`
        let _surname = `surname-${Math.random()}`
        let _email = `email-${Math.random()}@domain.com`
        let _password = `password-${Math.random()}`

        return Promise.all([ User.create({ name , surname , email , password }) , User.create({ name : _name , surname : _surname , email : _email , password : _password }) ])
            .then(([user1 , user2]) =>{
                userId = user1.id
                userId2 = user2.id

                const property = new Property({ address, m2 , year , cadastre })
                propertyId = property.id
                property.owners.push(userId)

                return property.save()
            })
        .then(property => {
            logic.unregisterProperty( property.id , userId2 ) 
            .catch(({ message }) => {
                expect(message).to.equal(`user with id ${userId2} is not owner of property with id ${property.id}`)
            })
        })
    })


    it('should fail on empty property id', () => 
        expect(() => logic.unregisterProperty("" , userId)).to.throw('property id is empty or blank')
    )
    
    it('should fail on wrong property id type', () => 
        expect(() => logic.unregisterProperty(123 , userId)).to.throw('property id with value 123 is not a string')
    )

    it('should fail on empty user id', () => 
        expect(() => logic.unregisterProperty(propertyId , "")).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.unregisterProperty(propertyId , 123)).to.throw('user id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})