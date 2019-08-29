const validate = require('../../../utils/validate')
const { User , Vehicle  } = require('../../../data')

module.exports = function(id , fieldsToUpdate){
    validate.string(id , 'user id')
    // validate.string(data , 'data')

    return(async ()=>{
        const vehicle = await Vehicle.findOne({_id : id})

        if(!vehicle) throw new Error(`vehicle with id ${id} does not exist`)
        
        await Vehicle.updateOne({ _id : id } , { $set: fieldsToUpdate })
        // await Vehicle.findByIdAndUpdate(id, fieldsToUpdate)
    })()
}