const validate = require('../../../utils/validate')
const { User , Vehicle} = require('../../../data')

module.exports = function(userId , vehicleId){
    validate.string(vehicleId , 'vehicle id')
    validate.string(userId , 'user id')

    return(async () =>{
        const promises = await Promise.all([ User.findOne({ _id : userId }) , Vehicle.findOne({ _id : vehicleId }) ])
        const [ user , vehicle ] = promises
            
            if(!user) throw new Error (`user with id ${userId} does not exist`)

            if(!vehicle) throw new Error (`vehicle with id ${vehicleId} does not exist`)

            if(!vehicle.owner.includes(userId)) throw new Error (`user with id ${userId} is not owner of vehicle with id ${vehicleId}`)

            return await Vehicle.deleteOne({ _id : vehicle._id })
    })()
}




    