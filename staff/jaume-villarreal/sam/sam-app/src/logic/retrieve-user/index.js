// import validate from '../../utils/validate'
// const REACT_APP_API_URL = process.env.REACT_APP_API_URL
// export default function (id, token) {

//     validate.string(id, 'id')
//     validate.string(token, 'token')

//     return (async () => {
//         const response = await fetch(`${REACT_APP_API_URL}/user/${id}`, {
//             method: 'GET',
//             headers: {'authorization': `bearer ${token}` }
//         })
        
//         if (response.status !== 200) {
//             const { error } = await response.json()
//             throw Error(error)
//         }
//         else {
//             return await response.json()
//         }
//     })()
// }