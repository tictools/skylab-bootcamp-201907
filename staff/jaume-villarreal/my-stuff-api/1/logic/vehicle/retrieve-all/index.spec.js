const mongoose = require('mongoose')
const { expect } = require('chai')
const { User , Property } = require('../../../data')
const logic = require('../.')

describe('logic', () => {
    let client, users

    before(() => mongoose.connect('mongodb://localhost:27017/my-api-test', { useNewUrlParser: true }))

    describe('retrieve user', () => {
        let userId, name, surname, email, password

        beforeEach(async () => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            await User.deleteMany()

            const user = await User.create({name, surname, email, password})
            userId = user.id
        })

        it('should succeed on correct data', async () =>{
            const properties = await logic.retrieveAllOwnerVehicles(userId)
                expect(properties).to.exist  
        })
    })

    after(() => mongoose.disconnect())
})