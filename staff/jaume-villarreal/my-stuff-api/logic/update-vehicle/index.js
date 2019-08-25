const { User } = require('../../data')
const { Vehicle } = require('../../data')

module.exports = function(userId , license , data){
    debugger
    return Promise.all([ User.findById({ _id : userId }) , Vehicle.findOne({ license })])
    .then(([ user , vehicle]) => {
        debugger
        if(!user) throw new Error ('wrong credentials')

        if(!vehicle) throw new Error(`vehicle with license ${license} does not exist`)

        if(!vehicle.owner.includes(userId)) throw new Error(`user with id ${id} is not the owner of vehicle with license ${license}`)
        
        return Vehicle.findByIdAndUpdate({ _id : vehicle._id } , { $set: data })
    })
}