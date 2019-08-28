const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

/**
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(ownerId) {
    
    validate.string(ownerId, 'user id')

    return(async ()=> {
        const vehicles = await Vehicle.find({ owner : ownerId }, { __v: 0 }).lean()
        
        if (!vehicles) throw Error(`User with id ${ownerId} does not own any property.`)
            
        vehicles.forEach(property => {
                vehicle.id = vehicle._id
                delete vehicle._id
            })
        
        return vehicles
    })()
}
