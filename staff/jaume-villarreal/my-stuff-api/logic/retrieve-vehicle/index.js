const { Vehicle } = require('../../data')

module.exports = function(vehicleId){
    return Vehicle.findOne({ _id : vehicleId } , { _id:0 }).lean()
        then(vehicle => {
            if(!vehicle) throw new Error (`vehicle with id ${vehicleId} does not exist`)
            vehicle.id = vehicleId
            return vehicle
        })
}
