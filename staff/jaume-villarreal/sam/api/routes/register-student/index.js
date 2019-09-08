const logic = require('../../logic')

module.exports = function(req , res){
    const { body : { name , surname , birthdate , healthcard , tutor } } = req

    try{
        logic.registerStudent(name , surname , birthdate , healthcard , tutor)
            .then( id => res.status(200).json({ message : "student correctly registered" , id}))
            .catch(({ message }) => res.status(401).json({ error : message }))
    }catch({ message }){
        res.status(401).json({ error : message })
    }
}