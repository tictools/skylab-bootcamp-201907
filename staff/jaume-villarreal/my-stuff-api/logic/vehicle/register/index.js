const validate = require('../../../utils/validate')
const { User , Vehicle } = require('../../../data')

module.exports = function(userId , brand , model , year , type , color , license) {
    validate.string(userId , 'user id')
    validate.string(brand , 'brand')
    validate.string(model , 'model')
    validate.number(year , 'year')
    validate.string(type , 'type')
    validate.string(color , 'color')
    validate.string(license , 'license')


    return Promise.all([ User.findOne({ _id : userId }) , Vehicle.findOne({ license })])
        .then(([ user , vehicle ]) => {
            if(!user) throw new Error(`user with id ${userId} does not exist`)
            
            if(vehicle) throw new Error(`vehicle with license ${license} already exists`)

            const _vehicle = new Vehicle({ brand , model , year , type , color , license })
            _vehicle.owner.push(user._id)
            return _vehicle.save()
        })
}