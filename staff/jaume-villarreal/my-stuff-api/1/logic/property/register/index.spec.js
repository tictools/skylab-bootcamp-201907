const mongoose = require('mongoose')
const { expect } = require('chai')
const { User , Property } = require('../../../data')
const logic = require('../../.')

describe('logic - register property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

     let name, surname, email, password , address , m2 , year , cadastre , userId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        address = `adress-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name , surname , email , password })
        userId = user.id
        return await Property.deleteMany()
    })

    it('should succeed on correct data', async () =>{
        const result = await logic.registerProperty(userId , address , m2 , year , cadastre)
            expect(result).to.exist
        
        const property = await Property.findOne({ cadastre })
            expect(property).to.exist
            expect(property.address).to.equal(address)
            expect(property.m2).to.equal(m2)
            expect(property.year).to.equal(year)
            expect(property.cadastre).to.equal(cadastre)
            expect(property.owners[0].toString()).to.equal(userId)
    })
    
    it('should fail on unexisting user', async () =>{
        try{
            await logic.registerProperty('5d5d5530531d455f75da9fF9' , address , m2 , year , cadastre)
        } catch({ message }){
           expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })
    
    it('should fail on existing property', async () =>{
        await logic.registerProperty(userId , address , m2 , year , cadastre)
        try{
            await logic.registerProperty(userId , address , m2 , year , cadastre)
        } catch({ message }){
           expect(message).to.equal('property already exists')
        }
    })

    it('should fail on empty user id', () => 
        expect(() => 
               logic.registerProperty( "" , address , m2 , year , cadastre )
        ).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => 
               logic.registerProperty( 123 , address , m2 , year , cadastre )
        ).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty address', () => 
        expect(() => 
               logic.registerProperty( userId , "" , m2 , year , cadastre )
        ).to.throw('address is empty or blank')
    )
    
    it('should fail on wrong address type', () => 
        expect(() => 
               logic.registerProperty( userId , 123 , m2 , year , cadastre )
        ).to.throw('address with value 123 is not a string')
    )
    
    it('should fail on empty m2', () => 
        expect(() => 
               logic.registerProperty( userId , address , "" , year , cadastre )
        ).to.throw('m2 is empty or blank')
    )
    
    it('should fail on wrong m2 type', () => 
        expect(() => 
               logic.registerProperty( userId , address , '123' , year , cadastre )
        ).to.throw('m2 with value 123 is not a number')
    )
   
    it('should fail on empty year', () => 
        expect(() => 
               logic.registerProperty( userId , address , m2 , "" , cadastre )
        ).to.throw('year is empty or blank')
    )
    
    it('should fail on wrong year type', () => 
        expect(() => 
               logic.registerProperty( userId , address , m2 , "123" , cadastre )
        ).to.throw('year with value 123 is not a number')
    )
    
    it('should fail on empty cadastre', () => 
        expect(() => 
               logic.registerProperty( userId , address , m2 , year , "" )
        ).to.throw('cadastre is empty or blank')
    )
    
    it('should fail on wrong cadastre type', () => 
        expect(() => 
               logic.registerProperty( userId , address , m2 , year , 123 )
        ).to.throw('cadastre with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})