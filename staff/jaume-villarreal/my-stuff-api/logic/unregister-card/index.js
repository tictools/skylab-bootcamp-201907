const { User } = require('../../data')
const { Card } = require('../../data')

module.exports = function(userId , cardId){
    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error (`user with id ${userId} does not exist`)
            
            const index = user.cards.findIndex(card => card.id === cardId )
            
            if(index<0) throw new Error (`card with id ${cardId} does not exist`)

            user.cards.splice(index)

           user.save()
        })
}