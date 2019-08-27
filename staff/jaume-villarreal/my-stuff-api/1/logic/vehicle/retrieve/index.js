 const validate = require('../../../utils/validate')
 const { Vehicle } = require('../../../data')

module.exports = function(vehicleId){
    validate.string(vehicleId , 'vehicle id')

    return(async ()=>{
        const vehicle = await Vehicle.findOne({ _id : vehicleId } , { _id:0 }).lean()
        if(!vehicle) throw new Error (`vehicle with id ${vehicleId} does not exist`)
        vehicle.id = vehicleId
        return vehicle
    })()
}

