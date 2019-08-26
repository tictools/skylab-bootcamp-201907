const { User } = require('../../data')
const { Property } = require('../../data')

/**
 * Registers a user.
 * 
 * @param {string} userId 
 * @param {string} address 
 * @param {Number} m2 
 * @param {Number} year
 * @param {String} cadastre
 * 
 * @returns {Promise}
 */

module.exports = function( userId , address , m2 , year , cadastre){
    return Promise.all([ User.findOne({ _id : userId }) , Property.findOne({ cadastre }) ])
        .then(([ user , property ]) => {
            if(!user) throw new Error (`user with id ${userId} does not exist`)

            if(property) throw new Error(`property with cadastre ${cadastre} already exists`)

            const newProperty = new Property({ address , m2 , year , cadastre })
            newProperty.owners.push(user.id)
            return newProperty.save()
        })
}
        