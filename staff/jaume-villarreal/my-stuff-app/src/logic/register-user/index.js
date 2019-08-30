import call from '../../utils/call/'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, email, password) {
    // validate fields

    return (async () => {
        const response= await call(`${REACT_APP_API_URL}/users` , 'post' , { 'content-type': 'application/json' }, { name, surname, email, password })

        if (response.message !== "user correctly registered") {
            const { error } = response

            throw Error(error)
        }
    })()
}