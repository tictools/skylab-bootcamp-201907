const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../data')
const { Property } = require('../../data')
const logic = require('..')

describe('logic - update property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address , m2 , year , cadastre , id0 , id1 , propertyId, body

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`
        owners = []
        id0 = '5d618ad961578b67fbb70bb0'
        id1 = '5d618ad961578b67fbb70bb1'
        id2 = '5d618ad961578b67fbb70bb2'
        id3 = '5d618ad961578b67fbb70bb3'

        body = {
            address : `address-${Math.random()}`,
            m2 : Math.random(),
            year : Math.random(),
            cadastre : `cadastre-${Math.random()}`,
            owners : [id2 , id3],
            extra : `extra-${Math.random()}`
        }

        return Property.deleteMany()
            .then(() => {
                    const property = new Property({ address , m2 , year , cadastre })
                    property.owners.push(id0,id1)
                    return property.save()
                })
            .then(property => propertyId = property.id)
    })

    it('should succeed on correct data', () =>
        logic.updateProperty(propertyId, body)
            .then(result => {
                expect(result).not.to.exist

                return Property.findById(propertyId)
            })
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(body.address)
                expect(property.m2).to.equal(body.m2)
                expect(property.year).to.equal(body.year)
                expect(property.cadastre).to.equal(body.cadastre)
                expect(property.owners).to.exist
                expect(property.owners[0].toString()).to.equal(id2)
                expect(property.owners[1].toString()).to.equal(id3)
                expect(property.extra).not.to.exist
            })
    )

    it('should fail on non-existing property', () => {
        propertyId = '5d5d5530531d455f75da9fF9'

        return logic.updateProperty(propertyId, body)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`property with id ${propertyId} does not exist`))
    })

    after(() => mongoose.disconnect())
})