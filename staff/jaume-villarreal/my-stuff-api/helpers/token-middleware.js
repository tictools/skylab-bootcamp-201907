const jwt = require('jsonwebtoken')

const { env : {JWT_SECRET} } = process

module.exports = function(req , res , next){
    try{
        const { params : { id } , headers : { authorization } } = req

            if(!authorization) throw new Error ('no authorization received')

            const token = authorization.slice(authorization.indexOf(' ')+1)
            
            const { sub } = jwt.verify(token , JWT_SECRET) // retrieve sub property from payload

            if(sub !== id) throw new Error (`token id ${sub} does not match received id ${id}`)

            next()
    } catch({ message }){
        res.status(400).json({ error : message })
    }
}
