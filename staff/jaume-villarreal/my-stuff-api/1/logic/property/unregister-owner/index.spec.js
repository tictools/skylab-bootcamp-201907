const mongoose = require('mongoose')
const { expect } = require('chai')
const { User , Property } = require('../../../data')
const logic = require('../../.')

describe('logic', () => {

    before(() => mongoose.connect('mongodb://localhost:27017/my-api-test', { useNewUrlParser: true }))

    describe.only('remove an owner on an existing property', () => {
        let name1 , surname1 , email1 , password1
        let name2 , surname2 , email2 , password2
        let name3 , surname3 , email3 , password3
        let address , m2 , year , cadastre
        let propertyId , userId1 , userId2 , userId3

        beforeEach( async () => {
            name1 = `name-${Math.random()}`
            surname1 = `surname-${Math.random()}`
            email1 = `email-${Math.random()}@domain.com`
            password1 = `password-${Math.random()}`
            
            name2 = `name-${Math.random()}`
            surname2 = `surname-${Math.random()}`
            email2 = `email-${Math.random()}@domain.com`
            password2 = `password-${Math.random()}`
            
            name3 = `name-${Math.random()}`
            surname3 = `surname-${Math.random()}`
            email3 = `email-${Math.random()}@domain.com`
            password3 = `password-${Math.random()}`

            address = `address-${Math.random()}`
            m2 = Math.random()
            year = Math.random()
            cadastre = `cadastre-${Math.random()}`

            await User.deleteMany()
            await Property.deleteMany()

            const property = await new Property({address , m2 , year , cadastre})
            const user1 = await User.create({ name : name1 , surname : surname1, email : email1, password : password1 })
            const user2 = await User.create({ name : name2 , surname : surname2, email : email2, password : password2 })
            const user3 = await User.create({ name : name3 , surname : surname3, email : email3, password : password3 })

            userId1 = user1.id
            userId2 = user2.id
            userId3 = user3.id
            propertyId = property.id

            property.owners.push(userId1)
            property.owners.push(userId2)
            property.owners.push(userId3)
            
            await property.save()
        })

        it('should unregister an owner on correct data', async() => {
            await logic.unregisterPropertyOwner(propertyId , userId1 , userId2)

            const property = await Property.findById(propertyId)
                expect(property).to.exist
                expect(property.owners.length).to.equal(2)
                expect(property.owners[0].toString()).to.equal(userId1)
                expect(property.owners[1].toString()).to.equal(userId3)
        })

        it('should fail on unexisting administrator user' , async ()=>{
            userId1 = '5d5d5530531d455f75da9fF9'
            try{
                await logic.unregisterPropertyOwner(propertyId , userId1 , userId2)
            }catch({ message }){
                expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
            }
        })
        
        it('should fail on unexisting property' , async ()=>{
            propertyId = '5d5d5530531d455f75da9fF9'
            try{
                await logic.unregisterPropertyOwner(propertyId , userId1 , userId2)
            }catch({ message }){
                expect(message).to.equal('property with id 5d5d5530531d455f75da9fF9 does not exist')
            }
        })

        it('should remove a property with a single owner' , async ()=>{
            await logic.unregisterPropertyOwner(propertyId , userId1 , userId2)
            await logic.unregisterPropertyOwner(propertyId , userId1 , userId3)
            await logic.unregisterPropertyOwner(propertyId , userId1 , userId1)
            
            const property = await Property.findById(propertyId)
                expect(property).not.to.exist
        })
        
        // it('should fail on empty property id', () => 
        //     expect(() => logic.registerNewPropertyOwner("" , userId1 , userId2)).to.throw('property is empty or blank')
        // )
        
        // it('should fail on empty property id', () => 
        //     expect(() => logic.registerNewPropertyOwner(123 , userId1 , userId2)).to.throw('property with value 123 is not a string')
        // )
        
        // it('should fail on empty property id', () => 
        //     expect(() => logic.registerNewPropertyOwner(propertyId , "" , userId2)).to.throw('owner is empty or blank')
        // )
        
        // it('should fail on empty property id', () => 
        //     expect(() => logic.registerNewPropertyOwner(propertyId , 123 , userId2)).to.throw('owner with value 123 is not a string')
        // )
        
        // it('should fail on empty property id', () => 
        //     expect(() => logic.registerNewPropertyOwner(propertyId , userId1 , "")).to.throw('new owner is empty or blank')
        // )
        
        // it('should fail on empty property id', () => 
        //     expect(() => logic.registerNewPropertyOwner(propertyId , userId1 , 123)).to.throw('new owner with value 123 is not a string')
        // )
    })


    after(() => mongoose.disconnect())

})