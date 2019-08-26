const { User } = require('../../data')
const mongoose = require('mongoose')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (userId) {
    return User.findOne({ _id: userId }, { _id: 0, password: 0 }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            user.id = userId

            return user
        })
}