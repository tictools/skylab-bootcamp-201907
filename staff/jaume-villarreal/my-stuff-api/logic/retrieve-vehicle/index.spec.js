const mongoose = require('mongoose')
const {  Types: { ObjectId } }  = mongoose
const { expect } = require('chai')
const { Vehicle } = require('../../data')
const logic = require('..')

describe('logic - retrieve vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand , model , year , type , color , license , vehicleId
    let types = ['tourism' , 'suv' , 'van' , 'coupe' , 'cabrio' , 'roadster' , 'truck']

    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random()
        type = types[ Math.floor( Math.random() * types.length ) ]
        color = `color-${Math.random()}`
        license = `license-${Math.random()}`
        id0 = "5d618ad961578b67fbb70bb7"

        return Vehicle.deleteMany()
            .then(() => {
                const vehicle = new Vehicle({ brand , model , year , type , color , license })
                vehicleId = vehicle.id
                vehicle.owner.push(id0)
                return vehicle.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.retrieveVehicle(vehicleId)
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle._id).not.to.exist
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.license).to.equal(license)
                expect(vehicle.owner).to.exist
                expect(vehicle.owner[0].toString()).to.equal(id0)
            })
    )
    
    it('should fail on wrong vehicle id', () =>
        logic.retrieveVehicle('5d5d5530531d455f75da9fF9')
            .catch(({ message }) => expect(message).to.equal('vehicle with license 5d5d5530531d455f75da9fF9 does not exist'))
    )

    it('should fail on empty vehicle id', () => 
        expect(() => logic.retrieveVehicle("")).to.throw('vehicle id is empty or blank')
    )
    
    it('should fail on wrong vehicle id type', () => 
        expect(() => logic.retrieveVehicle(123)).to.throw('vehicle id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})