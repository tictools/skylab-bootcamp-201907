const { User } = require('../../data')
const { Property } = require('../../data')

module.exports = function( cadastre , userId){
    return Promise.all([ User.findById({ _id : userId }) , Property.findOne({ cadastre }) ])
    .then(([ user , property ]) => {
        if (!user) throw new Error(`wrong credentials`)

        if (!property) throw new Error(`property with cadastre ${cadastre} does not exist`)
        
        if (property.owners.length > 1) throw new Error(`invalid action: there are two or more owners for this property`)
        
        if (!property.owners.includes(user.id)) throw new Error(`user with id ${id} is not owner of property with cadastre ${cadastre}`)

        return Property.deleteOne({ cadastre })
    })
}