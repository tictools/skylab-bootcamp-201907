const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../data')
const { Property } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

     let name, surname, email, password , address , m2 , year , cadastre , userId

    beforeEach(() => {
        name = `John`
        // name = `name-${Math.random()}`
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
    })

    it('should succeed on correct data', () =>
        logic.registerProperty(email , address , m2 , year , cadastre)
            .then(result => {
                expect(result).to.exist
                return Property.findOne({ cadastre })
            })
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owners[0].toString()).to.equal(userId)
            })
    )
    
    it('should fail on unexisting user', () =>
        logic.registerProperty('123' , address , m2 , year , cadastre)
            .catch( ({ message}) => expect(message).to.equal('user with email 123 does not exist'))
    )

    after(() => mongoose.disconnect())
})