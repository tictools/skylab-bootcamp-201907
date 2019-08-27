const mongoose = require('mongoose')
const { expect } = require('chai')
const { User } = require('../../../data')
const { Vehicle } = require('../../../data')
const logic = require('../../.')

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId , userId2 , name , surname , email , password , vehicleId , brand , model , year , type , color , license
    let types = ['tourism' , 'suv' , 'van' , 'coupe' , 'cabrio' , 'roadster' , 'truck']

    beforeEach(async () => {
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

        await User.deleteMany()
        const user = await User.create({ name , surname , email , password })
        userId = user.id
        
        await Vehicle.deleteMany()   
            
        const vehicle = await new Vehicle({ brand , model , year , type , color , license })
        vehicleId = vehicle.id
        vehicle.owner.push(userId)
        return await vehicle.save()
            
    })

    it('should succeed on correct data', async () =>{
        await logic.unregisterVehicle(vehicleId , userId)
        const vehicle = await Vehicle.findOne({ vehicleId })
            expect(vehicle).not.to.exist
    })

    it('should fail on right vehicle and unexisting user', async () =>{
        try{
            await logic.unregisterVehicle(vehicleId , '5d5d5530531d455f75da9fF9')
        }catch({ message }){
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it('should fail on existing user and unexisting vehicle', async ()=>{
        try{
            await logic.unregisterVehicle('5d5d5530531d455f75da9fF9' , userId)
        }catch({ message }){
            expect(message).to.equal('vehicle with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it("should fail on unregistering a vehicle by a user who is not an owner" , async () => {
        let _name = `name-${Math.random()}`
        let _surname = `surname-${Math.random()}`
        let _email = `email-${Math.random()}@domain.com`
        let _password = `password-${Math.random()}`

        const promises = await Promise.all([ User.create({ name , surname , email , password }) , User.create({ name : _name , surname : _surname , email : _email , password : _password }) ])
        const [user1 , user2] = promises
        userId = user1.id
        userId2 = user2.id

        const vehicle = await new Vehicle({ brand , model , year , type , color , license })
        vehicleId = vehicle.id
        vehicle.owner.push(userId)
        return await vehicle.save()

        try{
            await logic.unregisterVehicle( vehicle.id , userId2 ) 
        }catch({ message }){
            expect(message).to.equal(`user with id ${userId2} is not owner of vehicle with id ${vehicle.id}`)
        }
    })

    it('should fail on empty vehicle id', () => 
        expect(() => logic.unregisterVehicle("" , userId)).to.throw('vehicle id is empty or blank')
    )
    
    it('should fail on wrong vehicle id type', () => 
        expect(() => logic.unregisterVehicle(123 , userId)).to.throw('vehicle id with value 123 is not a string')
    )
    
    it('should fail on empty user id', () => 
        expect(() => logic.unregisterVehicle(vehicleId , "")).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.unregisterVehicle(vehicleId , 123)).to.throw('user id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})