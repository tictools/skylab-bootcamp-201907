const { User } = require('../../data')
const { Vehicle } = require('../../data')

module.exports = function(license , userId){
    debugger
    return Promise.all([ User.findOne({ _id : userId }) , Vehicle.findOne({ license }) ])
        .then(([ user , vehicle ]) => {
            debugger
            if(!user) throw new Error ('wrong credentials')

            if(!vehicle) throw new Error (`vehicle with license ${license} does not exist`)

            if(!vehicle.owner.includes(user.id)) throw new Error (`user with id ${id} is not owner of vehicle with license ${license}`)

            return Vehicle.deleteOne({ _id : vehicle._id })
        })
}