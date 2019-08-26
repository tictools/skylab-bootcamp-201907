const validate = require('../../utils/validate')
const { User } = require('../../data')
const { Vehicle } = require('../../data')

module.exports = function(userId , license , data){
    validate.string(userId , 'user id')
    validate.string(license , 'license')
    // validate.string(data , 'data')

    return Promise.all([ User.findById({ _id : userId }) , Vehicle.findOne({ license })])
    .then(([ user , vehicle]) => {
        if(!user) throw new Error ('wrong credentials')

        if(!vehicle) throw new Error(`vehicle with license ${license} does not exist`)

        if(!vehicle.owner.includes(userId)) throw new Error(`user with id ${id} is not the owner of vehicle with license ${license}`)
        
        return Vehicle.updateOne({ _id : vehicle._id } , { $set: data })
    })
}



