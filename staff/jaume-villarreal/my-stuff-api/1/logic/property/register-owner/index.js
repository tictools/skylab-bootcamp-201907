const validate = require('../../../utils/validate')
const { User, Property } = require('../../../data')

/**
 * Unregisters a user by their id
 * 
 * @param {string} propertyId
 * @param {string} ownerId 
 * 
 * @returns {Promise}
*/

module.exports = function(propertyId , ownerId , newOwnerId) {
    validate.string(propertyId, 'property')
    validate.string(ownerId, 'owner')
    validate.string(newOwnerId, 'new owner')

    return(async ()=>{
    const [property , owner , newOwner] = await Promise.all( [Property.findById(propertyId) , User.findById(ownerId) , User.findById(newOwnerId)] )

    if(!owner) throw new Error (`user with id ${ownerId} does not exist`)
    if(!newOwner) throw new Error (`user with id ${newOwnerId} does not exist`)
    if(!property) throw new Error (`property with id ${propertyId} does not exist`)

    const existOwner = property.owners.some(owner => owner.toString() === ownerId)
    const existNewOwner = property.owners.some(owner => owner.toString() === newOwnerId)

    if(!existOwner) throw new Error (`user with id ${ownerId} is not owner of property with id ${propertyId}`)
    if(existNewOwner) throw new Error (`user with id ${newOwnerId} is already owner of property with id ${propertyId}`)

    property.owners.push(newOwnerId)
    await property.save()
    })()
}