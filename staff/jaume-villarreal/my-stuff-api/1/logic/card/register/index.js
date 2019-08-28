const validate = require('../../../utils/validate')
const { User , Card } = require('../../../data')

module.exports = function(userId , number , expiration){
    validate.string(userId , 'user id')
    validate.number(number , 'number')
    validate.date(expiration , 'date')

    return (async () => {
        const user = await User.findById(userId)
           
        if(!user) throw new Error (`user with id ${userId} does not exist`)

        let card = user.cards.find( card => card.number === number)

        if(card) throw new Error ('card already exists')

        card = await new Card ({ number , expiration }) 

        user.cards.push(card)

        await user.save()            
        
        return card.id
    })()
}