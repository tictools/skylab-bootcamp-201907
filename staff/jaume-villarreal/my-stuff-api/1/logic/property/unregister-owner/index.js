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

module.exports = function(propertyId , ownerId , removingOwnerId) {
    validate.string(propertyId, 'property')
    validate.string(ownerId, 'owner')
    validate.string(removingOwnerId, 'removing owner')

    return(async ()=>{
    const [property , owner , removingOwner] = await Promise.all( [Property.findById(propertyId) , User.findById(ownerId) , User.findById(removingOwnerId)] )

    if(!owner) throw new Error (`user with id ${ownerId} does not exist`)
    if(!removingOwner) throw new Error (`user with id ${removingOwnerId} does not exist`)
    if(!property) throw new Error (`property with id ${propertyId} does not exist`)

    const existOwner = property.owners.some(owner => owner.toString() === ownerId)
    const indexRemovingOwner = property.owners.findIndex(owner => owner.toString() === removingOwnerId)

    if(!existOwner || property.owners[0].toString() !== ownerId) throw new Error (`user with id ${ownerId} is not owner of property with id ${propertyId}`)
    if(indexRemovingOwner < 0) throw new Error (`user with id ${removingOwnerId} is not owner of property with id ${propertyId}`)
    debugger
    if(property.owners.length === 1) await Property.deleteOne({ _id : propertyId })
    else{
        property.owners.splice(indexRemovingOwner,1)
        debugger
        await property.save()
    }
    })()
}