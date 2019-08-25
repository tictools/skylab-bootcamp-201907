const mongoose = require('mongoose')
const {  Types: { ObjectId } }  = mongoose
const { expect } = require('chai')
const { Property } = require('../../data')
const logic = require('..')

describe('logic - retrieve property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let adress , m2 , year , cadastre , owners , id0 , id1 , propertyId

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`
        id0 = "5d618ad961578b67fbb70bb7"
        id1 = "5d618ad961578b67fbb70bb8"

        return Property.deleteMany()
            .then(() => {
                const property = new Property({ address , m2 , year , cadastre })
                property.owners.push(id0,id1)
                return property.save()
            })
            .then(property => propertyId = property.id)
    })

    it('should succeed on correct data', () =>
        logic.retrieveProperty(cadastre)
            .then(property => {
                expect(property).to.exist
                expect(property._id).not.to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owners).to.exist
                expect(property.owners[0].toString()).to.equal(id0)
                expect(property.owners[1].toString()).to.equal(id1)
            })
    )

    after(() => mongoose.disconnect())
})