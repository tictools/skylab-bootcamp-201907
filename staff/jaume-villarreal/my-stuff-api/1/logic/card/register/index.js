const validate = require('../../../utils/validate')
const { User , Card } = require('../../../data')

module.exports = function(userId , number , expiration){
    validate.string(userId , 'user id')
    validate.number(number , 'number')
    validate.date(expiration , 'date')

    let cardId

    return (async () => {
        const user = await User.findById(userId)
           
        if(!user) throw new Error (`user with id ${userId} does not exist`)

        const card = user.cards.find( card => card.number === number)

        if(card) throw new Error ('card already exists')

        const _card = new Card ({ number , expiration }) 
        
        cardId = _card.id

        user.cards.push(_card)

        await user.save()            
        
        return cardId
    })()
}