const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../data')
const { Vehicle } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

     let userId , name, surname , email , password , brand , model , year , type , color , license 
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
                userId = user.id
                return Vehicle.deleteMany()
            })
    })

    it('should succeed on correct data', () =>
        logic.registerVehicle(userId , brand , model , year , type , color , license)
            .then(result => {
                expect(result).to.exist
                return Vehicle.findOne({ license })
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.license).to.equal(license)
                expect(vehicle.owner[0].toString()).to.equal(userId)
            })
    )
    
    it('should fail on unexisting user', () =>
        logic.registerVehicle('5d5d5530531d455f75da9fF9' , brand , model , year , type , color , license)
            .catch( ({ message}) => expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist'))
    )

    it('should fail on existing vehicle', () =>{
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random()
        type = types[ Math.floor( Math.random() * types.length ) ]
        color = `color-${Math.random()}`
        license = `license-${Math.random()}`

        return Vehicle.create({ brand , model , year , type , color , license })
            .then(vehicle => logic.registerVehicle(userId , brand , model , year , type , color , license))
            .catch( ({ message }) => expect(message).to.equal(`vehicle with license ${license} already exists`))
        }
    )

    after(() => mongoose.disconnect())
})