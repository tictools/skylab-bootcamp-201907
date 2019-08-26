const { User } = require('../../data')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    return User.findById(id)
        .then(user => {
            if (!user) throw new Error(`user with id ${id} does not exist`)
            return User.updateOne({ _id : id } , { $set: data })
        })
}