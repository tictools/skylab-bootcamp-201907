// module.exports = {
//     register : require('./register-card'),
//     retrieve : require('./retrieve-card'),
//     unregister : require('./unregister-card')
// }

module.exports = {
   registerCard: require('./register'),
   retrieveCard: require('./retrieve'),
   unregisterCard: require('./unregister'),
}