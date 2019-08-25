const { Property } = require('../../data')

module.exports = function( cadastre ){
    return Property.findOne({ cadastre : cadastre} , { _id : 0 }).lean()
        .then(property => {
            if (!property) throw new Error (`property with cadastre ${cadastre} does not exist`)
            return property
        })
}