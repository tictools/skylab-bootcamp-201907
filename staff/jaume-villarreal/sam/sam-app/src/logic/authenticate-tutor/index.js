import utils from 'utils'

const { validate } = utils

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (email, password) {

    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {

        const headers = { "content-type" : "application/json" }
        const body = JSON.stringify({ email, password })

        const response = await fetch(`${REACT_APP_API_URL}/tutors/auth`, {
            method: 'POST',
            headers: headers,
            body: body
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            const { message , id  , token } = await response.json()
            return { message , id , token }        
        }   
    })()
}