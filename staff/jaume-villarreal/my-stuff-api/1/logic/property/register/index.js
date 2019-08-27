const validate = require('../../../utils/validate')
const { User , Property } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} userId 
 * @param {string} address 
 * @param {Number} m2 
 * @param {Number} year
 * @param {String} cadastre
 * 
 * @returns {Promise}
 */

module.exports = function( userId , address , m2 , year , cadastre ){
    validate.string(userId , 'user id')
    validate.string(address , 'address')
    validate.number(m2 , 'm2')
    validate.number(year , 'year')
    validate.string(cadastre , 'cadastre')

    return(async () =>{
        const promises = await Promise.all([ User.findOne({ _id : userId }) , Property.findOne({ cadastre }) ])
        const [ user , property ] = promises
        
        if(!user) throw new Error (`user with id ${userId} does not exist`)

        if(property) throw new Error(`property already exists`)

        const newProperty = await new Property({ address , m2 , year , cadastre })
        newProperty.owners.push(user.id)

        return await newProperty.save()
    })()
}
        