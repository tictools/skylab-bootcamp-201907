const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../data')
const { Property } = require('../../data')
const logic = require('..')

describe('logic - unregister property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId , name , surname , email , password , address , m2 , year , cadastre

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
                property.owners.push(userId)
                return property.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.unregisterProperty(cadastre , userId)
            .then(result => Property.findOne({ cadastre }))
            .then(property => {
                expect(property).not.to.exist
            })
    )

    it('should fail on right cadsatre and unexisting user', () =>
        logic.unregisterProperty(cadastre , '5d5d5530531d455f75da9fF9')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    it('should fail on existing user, but wrong cadastre', () =>{
        return logic.unregisterProperty('123' , userId)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('property with cadastre 123 does not exist'))

    })
    
    it('should fail on existing more than one owner i nproperty', () =>{
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
            .then(property => logic.unregisterProperty(property.cadastre , userId))
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('invalid action: there are two or more owners for this property'))

    })

    after(() => mongoose.disconnect())
})