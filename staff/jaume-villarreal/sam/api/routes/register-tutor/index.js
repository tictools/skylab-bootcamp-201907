
const logic = require('../../logic')

module.exports = function(req , res){
    const { body : { name, surname, dni , phone1 , email, password } } = req

    try{
        logic.registerTutor(name, surname, dni , phone1 , email, password)
            .then(() => res.status(201).json({ message : 'tutor correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error : message}))
    }catch({ message }){
        res.status(400).json({ error : message })
    }
}