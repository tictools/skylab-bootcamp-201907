// module.exports = {
//     register : require('./register-user'),
//     authenticate : require('./authenticate-user'),
//     retrieve : require('./retrieve-user'),
//     update : require('./update-user'),
//     unregister : require('./unregister-user')
// }

module.exports = {
   registerUser: require('./register'),
   authenticateUser: require('./authenticate'),
   retrieveUser: require('./retrieve'),
   updateUser: require('./update'),
   unregisterUser: require('./unregister')
}