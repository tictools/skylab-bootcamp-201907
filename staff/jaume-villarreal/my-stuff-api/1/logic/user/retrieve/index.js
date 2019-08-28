const validate = require('../../../utils/validate')
const { User } = require('../../../data')
const mongoose = require('mongoose')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (userId) {

    validate.string(userId , 'user id')

    return(async ()=>{
        const user = await User.findOne({ _id: userId }, { _id: 0, __v:0, password: 0 }).lean()
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        user.id = userId

        return user
    })() 
}

