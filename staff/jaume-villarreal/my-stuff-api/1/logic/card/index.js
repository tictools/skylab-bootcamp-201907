// module.exports = {
//     register : require('./register-card'),
//     retrieve : require('./retrieve-card'),
//     unregister : require('./unregister-card')
// }

module.exports = {
   registerCard: require('./register'),
   retrieveCard: require('./retrieve'),
   retrieveAllOwnerCards: require('./retrieve-all'),
   unregisterCard: require('./unregister'),
}