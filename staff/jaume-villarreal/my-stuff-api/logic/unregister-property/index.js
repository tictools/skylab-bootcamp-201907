const validate = require('../../utils/validate')
const { User } = require('../../data')
const { Property } = require('../../data')

module.exports = function( propertyId , userId){
    validate.string(propertyId , 'property id')
    validate.string(userId , 'user id')

    return Promise.all([ User.findById({ _id : userId }) , Property.findOne({ _id : propertyId }) ])
    .then(([ user , property ]) => {
        if (!user) throw new Error(`user with id ${userId} does not exist`)

        if (!property) throw new Error(`property with id ${propertyId} does not exist`)
        
        if (property.owners.length > 1) throw new Error(`invalid action: there are two or more owners for this property`)
        
        if (!property.owners.includes(user.id)) throw new Error(`user with id ${userId} is not owner of property with id ${propertyId}`)

        Property.deleteOne({ _id : propertyId })
    })
}
    