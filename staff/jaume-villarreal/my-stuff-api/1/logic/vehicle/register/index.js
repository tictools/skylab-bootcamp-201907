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

    return(async () =>{
        const promises =  await Promise.all([ User.findOne({ _id : userId }) , Vehicle.findOne({ license })])
        const [ user , vehicle ] = promises

        if(!user) throw new Error(`user with id ${userId} does not exist`)
        
        if(vehicle) throw new Error(`vehicle with license ${license} already exists`)

        const _vehicle = await new Vehicle({ brand , model , year , type , color , license })
        _vehicle.owner.push(user._id)
        
        return await _vehicle.save()
    })()
}