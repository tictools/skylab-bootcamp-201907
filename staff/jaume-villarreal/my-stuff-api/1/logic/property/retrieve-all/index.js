const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(ownerId) {
    
    validate.string(ownerId, 'user id')

    return(async ()=> {
        const properties = await Property.find({ owner : ownerId }, { __v: 0 }).lean()
        
        if (!properties) throw Error(`User with id ${ownerId} does not own any property.`)
            
        properties.forEach(property => {
                property.id = property._id
                delete property._id
            })
        
        return properties
    })()
}
