const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../data')
const { Property } = require('../../data')
const logic = require('..')

describe('logic - update property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId1 , userId2 , name, surname , email , password , address , m2 , year , cadastre , id0 , id1 , id2 , id3 , propertyId , updatedData

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`
        owners = []

        id0 = '5d618ad961578b67fbb70bb0'
        id1 = '5d618ad961578b67fbb70bb1'
        id2 = '5d618ad961578b67fbb70bb2'
        id3 = '5d618ad961578b67fbb70bb3'

        updatedData = {
            address : `address-${Math.random()}`,
            m2 : Math.random(),
            year : Math.random(),
            cadastre : cadastre,
            owners : [id2 , id3],
            extra : `extra-${Math.random()}`
        }

        return User.deleteMany()
            .then(() => Property.deleteMany())
            .then(() => User.create({ name , surname , email , password }))
            .then(user =>{
                userId1 = user._id
                const property = new Property({ address , m2 , year , cadastre })
                property.owners.push(userId1)
                return property.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.updateProperty(userId1, cadastre , updatedData)
            .then(() => Property.findOne({ cadastre }))
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(updatedData.address)
                expect(property.m2).to.equal(updatedData.m2)
                expect(property.year).to.equal(updatedData.year)
                expect(property.cadastre).to.equal(updatedData.cadastre)
                expect(property.owners).to.exist
                expect(property.owners[0].toString()).to.equal(id2)
                expect(property.owners[1].toString()).to.equal(id3)
                expect(property.extra).not.to.exist
            })
    )

    it('should fail on non-existing user', () => {
        userId1 = '5d5d5530531d455f75da9fF9'

        return logic.updateProperty(userId1, cadastre , updatedData)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`wrong credentials`))
    })

    it('should fail on non-existing property', () => {
        return logic.updateProperty(userId1, '123' , updatedData)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`property with cadastre 123 does not exist`))
    })

    // it('should fail on non owner user', () => {
    //     return User.create({ name , surname , email , password })
    //         .then(user => {
    //             userId2 = user._id
    //             return logic.updateProperty(userId2, license , updatedData)
    //         })
    //         .then(() => { throw new Error('should not reach this point') })
    //         .catch(({ message }) => expect(message).to.equal(`user with id ${userId2} is not the owner of property with cadastre ${cadastre}`))
    // })

    after(() => mongoose.disconnect())
})