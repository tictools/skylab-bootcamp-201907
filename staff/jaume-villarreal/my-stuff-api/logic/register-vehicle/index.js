const { User } = require('../../data')
const { Vehicle } = require('../../data')

module.exports = function(email , brand , model , year , type , color , license) {
    return Promise.all([ User.findOne({ email }) , Vehicle.findOne({ license })])
        .then(([ user , vehicle ]) => {
            if(!user) throw new Error('wrong credentials')
            
            if(vehicle) throw new Error(`vehicle with license ${license} already exists`)

            const _vehicle = new Vehicle({ brand , model , year , type , color , license })
            _vehicle.owner.push(user._id)
            return _vehicle.save()
        })
}