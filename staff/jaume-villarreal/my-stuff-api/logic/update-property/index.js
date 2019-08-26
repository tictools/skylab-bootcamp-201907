const { User } = require('../../data')
const { Property } = require('../../data')

module.exports = function(userId , cadastre , data){
    debugger
    return Promise.all([ User.findById({ _id : userId }) , Property.findOne({ cadastre })])
    .then(([ user , property]) => {
        if(!user) throw new Error ('wrong credentials')

        if(!property) throw new Error(`property with cadastre ${cadastre} does not exist`)

        if(!property.owners.includes(userId)) throw new Error(`user with id ${id} is not owner of property with cadastre ${cadastre}`)
        
        return Property.updateOne({ _id : property._id } , { $set: data })
    })
}