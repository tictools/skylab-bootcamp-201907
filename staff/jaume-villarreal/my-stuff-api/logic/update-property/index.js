const { Property } = require('../../data')

module.exports = function( id , data){
    debugger
    return Property.findByIdAndUpdate({ _id : id } , {$set : data})
        .then(property => {
            if(!property) throw new Error (`property with id ${id} does not exist`)
        })
}