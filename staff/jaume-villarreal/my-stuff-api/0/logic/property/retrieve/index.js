const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

module.exports = function( propertyId ){
    validate.string(propertyId , 'property id')
    
    return Property.findOne({ _id : propertyId} , { _id : 0 }).lean()
        .then(property => {
            if (!property) throw new Error (`property with id ${propertyId} does not exist`)
            return property
        })
}