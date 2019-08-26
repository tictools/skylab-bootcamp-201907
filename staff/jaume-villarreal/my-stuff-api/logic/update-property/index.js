const { User } = require('../../data')
const { Property } = require('../../data')

module.exports = function(userId , propertyId , data){
    debugger
    return Promise.all([ User.findById({ _id : userId }) , Property.findOne({ _id : propertyId })])
    .then(([ user , property]) => {
        if(!user) throw new Error (`user with id ${userId} does not exist`)

        if(!property) throw new Error(`property with id ${propertyId} does not exist`)

        if(!property.owners.includes(userId)) throw new Error(`user with id ${userId} is not owner of property with id ${propertyId}`)
        
        return Property.updateOne({ _id : property._id } , { $set: data })
    })
}