const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../data')
const { Vehicle } = require('../../data')
const logic = require('..')

describe('logic - update vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

     let userId1 , userId2 , name, surname , email , password , brand , model , year , type , color , license 
     let types = ['tourism' , 'suv' , 'van' , 'coupe' , 'cabrio' , 'roadster' , 'truck']

     beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random()
        type = types[ Math.floor( Math.random() * types.length ) ]
        color = `color-${Math.random()}`
        license = `license-${Math.random()}`
        
        updatedData = {
            brand : `Volkswagen`,
            model : `model-${Math.random()}`,
            year : 1975,
            type : types[ Math.floor( Math.random() * types.length ) ],
            color : `color-${Math.random()}`,
            license : license
        }

        return User.deleteMany()
            .then(() => Vehicle.deleteMany())
            .then(() => User.create({ name , surname , email , password }))
            .then(user =>{
                userId1 = user._id
                const vehicle = new Vehicle({ brand , model , year , type , color , license })
                vehicle.owner.push(userId1)
                return vehicle.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.updateVehicle(userId1, license , updatedData)
            .then(result =>{
                 expect(result.nModified).to.exist
                 return Vehicle.findOne({ license })
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.brand).to.equal(updatedData.brand)
                expect(vehicle.model).to.equal(updatedData.model)
                expect(vehicle.year).to.equal(updatedData.year)
                expect(vehicle.type).to.equal(updatedData.type)
                expect(vehicle.color).to.equal(updatedData.color)
                expect(vehicle.license).to.equal(updatedData.license)
                expect(vehicle.owner).to.exist
                expect(vehicle.owner[0].toString()).to.equal(userId1.toString())
                expect(vehicle.extra).not.to.exist
            })
    )

    it('should fail on non-existing user', () => {
        userId1 = '5d5d5530531d455f75da9fF9'

        return logic.updateVehicle(userId1, license , updatedData)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`wrong credentials`))
    })
    
    it('should fail on non-existing vehicle', () => {
        return logic.updateVehicle(userId1, '123' , updatedData)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`vehicle with license 123 does not exist`))
    })
    
    // it('should fail on non owner user', () => {
    //     return User.create({ name , surname , email , password })
    //         .then(user => {
    //             userId2 = user._id
    //             return logic.updateVehicle(userId2, license , updatedData)
    //         })
    //         .then(() => { throw new Error('should not reach this point') })
    //         .catch(({ message }) => expect(message).to.equal(`user with id ${userId2} is not the owner of vehicle with license ${license}`))
    // })

    after(() => mongoose.disconnect())
})