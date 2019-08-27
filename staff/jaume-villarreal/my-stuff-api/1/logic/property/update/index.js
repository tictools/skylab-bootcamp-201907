const validate = require('../../../utils/validate')
const { User , Property} = require('../../../data')

module.exports = function(userId , propertyId , data){
    validate.string(userId , 'user id')
    validate.string(propertyId , 'property id')
    // validate.string(data , 'data')

    return (async () =>{
    const promises = await Promise.all([ User.findById({ _id : userId }) , Property.findOne({ _id : propertyId })])
    const [user , property] = promises
  
    if(!user) throw new Error (`user with id ${userId} does not exist`)

    if(!property) throw new Error(`property with id ${propertyId} does not exist`)

    if(!property.owners.includes(userId)) throw new Error(`user with id ${userId} is not owner of property with id ${propertyId}`)
    
    return await Property.updateOne({ _id : property._id } , { $set: data })
 
    })()

}
    