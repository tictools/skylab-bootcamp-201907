const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../data')
const { Vehicle } = require('../../data')
const logic = require('..')

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId , name , surname , email , password , vehicleId , brand , model , year , type , color , license
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

        return User.deleteMany()
            .then(() => User.create({ name , surname , email , password }))
            .then(user =>{
                userId = user._id
                return Vehicle.deleteMany()
            })
            .then(() => {
                const vehicle = new Vehicle({ brand , model , year , type , color , license })
                vehicleId = vehicle.id
                vehicle.owner.push(userId)
                return vehicle.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.unregisterVehicle(vehicleId , userId)
            .then(result => Vehicle.findOne({ vehicleId }))
            .then(vehicle => {
                expect(vehicle).not.to.exist
            })
    )

    it('should fail on right vehicle and unexisting user', () =>
        logic.unregisterVehicle(vehicleId , '5d5d5530531d455f75da9fF9')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist'))
    )

    it('should fail on existing user and unexisting vehicle', () =>{
        return logic.unregisterVehicle('5d5d5530531d455f75da9fF9' , userId)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('vehicle with id 5d5d5530531d455f75da9fF9 does not exist'))

    })

    it("should fail on ")

    after(() => mongoose.disconnect())
})