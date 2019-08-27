const mongoose = require('mongoose')
const {  Types: { ObjectId } }  = mongoose
const { expect } = require('chai')
const { Property } = require('../../../data')
const logic = require('../../.')

describe('logic - retrieve property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let adress , m2 , year , cadastre , owners , id0 , id1 , propertyId

    beforeEach(async () => {
        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`
        id0 = "5d618ad961578b67fbb70bb7"
        id1 = "5d618ad961578b67fbb70bb8"

        await Property.deleteMany()
            
        const property = await new Property({ address , m2 , year , cadastre })
        property.owners.push(id0,id1)
        
        await property.save()
            
        propertyId = property.id
    })

    it('should succeed on correct data', async () =>{
        const property = await logic.retrieveProperty(propertyId)    
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

    it("should fail on unexisting property" , async () => {
        propertyId = '5d5d5530531d455f75da9fF9'
        try{
            await logic.retrieveProperty(propertyId)
        } catch({ message }){
            expect(message).to.equal('property with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

     it('should fail on empty property id', () => 
        expect(() => logic.retrieveProperty("")).to.throw('property id is empty or blank')
    )
    
    it('should fail on wrong surname type', () => 
        expect(() => logic.retrieveProperty(123)).to.throw('property id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})