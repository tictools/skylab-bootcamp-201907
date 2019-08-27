const validate = require('../../../utils/validate')
const { User , Card } = require('../../../data')

module.exports = function(userId , cardId){
    validate.string(userId , 'user id')
    validate.string(cardId , 'card id')

    return(async () => {
        const user = await User.findById(userId)
 
        if (!user) throw new Error (`user with id ${userId} does not exist`)

        const index = user.cards.findIndex(card => card.id === cardId )

        if(index<0) throw new Error (`card with id ${cardId} does not exist`) 
        
        user.cards.splice(index) 
        
        await user.save()
     })()
}
    