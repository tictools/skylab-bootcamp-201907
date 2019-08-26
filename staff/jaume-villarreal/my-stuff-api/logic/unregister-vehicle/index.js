const { User } = require('../../data')
const { Vehicle } = require('../../data')

module.exports = function(vehicleId , userId){
    debugger
    return Promise.all([ User.findOne({ _id : userId }) , Vehicle.findOne({ _id : vehicleId }) ])
        .then(([ user , vehicle ]) => {
            debugger
            if(!user) throw new Error ('wrong credentials')

            if(!vehicle) throw new Error (`vehicle with id ${vehicleId} does not exist`)

            if(!vehicle.owner.includes(user.id)) throw new Error (`user with id ${userId} is not owner of vehicle with id ${vehicleId}`)

            return Vehicle.deleteOne({ _id : vehicle._id })
        })
}