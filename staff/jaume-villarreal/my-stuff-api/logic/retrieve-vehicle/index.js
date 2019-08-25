const { Vehicle } = require('../../data')

module.exports = function(license){
    return Vehicle.findOne({ license } , { _id:0 }).lean()
        then(vehicle => {
            if(!vehicle) throw new Error (`vehicle with license ${license} does not exist`)
            vehicle.id = vehicle._id.toString()
            return vehicle
        })
}
