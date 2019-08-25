const { User } = require('../../data')
const { Card } = require('../../data')

module.exports = function(userId , number , expiration){
    return Promise.all([ User.findById({ _id : userId }) , Card.findOne({ number })])
        .then(([ user , card ]) => {
            if(!user) throw new Error ('wrong credentials')

            if(card) throw new Error ('card already exists')

            
            const _card = new Card ({ number , expiration })
            _card.save()

            user.cards.push(_card)

            return user
    })
}   