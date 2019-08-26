const { User } = require('../../data')
const { Card } = require('../../data')

module.exports = function(userId , number , expiration){
    let cardId , _user

    return User.findById(userId)
        .then(user => {
            if(!user) throw new Error (`user with id ${userId} does not exist`)
            _user = user

            const card = user.cards.find( card => card.number === number)
            if(card) throw new Error ('card already exists')

            const _card = new Card ({ number , expiration }) 
            cardId = _card.id

            user.cards.push(_card)

            return user.save()            
        })
        .then(() => cardId)
}