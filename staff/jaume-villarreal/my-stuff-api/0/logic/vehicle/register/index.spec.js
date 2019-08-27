const mongoose = require('mongoose')
const { expect } = require('chai')
const { User , Vehicle } = require('../../../data')
const logic = require('../../.')

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

    it('should fail on empty user id', () => 
        expect(() => logic.registerVehicle("" , brand , model , year , type , color , license)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.registerVehicle(123 , brand , model , year , type , color , license)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty brand', () => 
        expect(() => logic.registerVehicle(userId , "" , model , year , type , color , license)).to.throw('brand is empty or blank')
    )
    
    it('should fail on wrong brand type', () => 
        expect(() => logic.registerVehicle(userId , 123 , model , year , type , color , license)).to.throw('brand with value 123 is not a string')
    )
    
    it('should fail on empty model', () => 
        expect(() => logic.registerVehicle(userId , brand , "" , year , type , color , license)).to.throw('model is empty or blank')
    )
    
    it('should fail on wrong model type', () => 
        expect(() => logic.registerVehicle(userId , brand , 123 , year , type , color , license)).to.throw('model with value 123 is not a string')
    )
    
    it('should fail on empty year', () => 
        expect(() => logic.registerVehicle(userId , brand , model , "" , type , color , license)).to.throw('year is empty or blank')
    )
    
    it('should fail on wrong year type', () => 
        expect(() => logic.registerVehicle(userId , brand , model , "123" , type , color , license)).to.throw('year with value 123 is not a number')
    )
    
    it('should fail on empty type', () => 
        expect(() => logic.registerVehicle(userId , brand , model , year , "" , color , license)).to.throw('type is empty or blank')
    )
    
    it('should fail on wrong type type', () => 
        expect(() => logic.registerVehicle(userId , brand , model , year , 123 , color , license)).to.throw('type with value 123 is not a string')
    )
    
    it('should fail on empty color', () => 
        expect(() => logic.registerVehicle(userId , brand , model , year , type , "" , license)).to.throw('color is empty or blank')
    )
    
    it('should fail on wrong color type', () => 
        expect(() => logic.registerVehicle(userId , brand , model , year , type , 123 , license)).to.throw('color with value 123 is not a string')
    )
    
    it('should fail on empty license', () => 
        expect(() => logic.registerVehicle(userId , brand , model , year , type , color , "")).to.throw('license is empty or blank')
    )
    
    it('should fail on wrong license type', () => 
        expect(() => logic.registerVehicle(userId , brand , model , year , type , color , 123)).to.throw('license with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})