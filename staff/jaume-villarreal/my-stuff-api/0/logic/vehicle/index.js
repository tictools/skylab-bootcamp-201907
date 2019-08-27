// module.exports = {
//     register : require('./register-vehicle'),
//     retrieve : require('./retrieve-vehicle'),
//     update : require('./update-vehicle'),
//     unregister : require('./unregister-vehicle')
// }

module.exports = {
   registerVehicle: require('./register'),
   retrieveVehicle: require('./retrieve'),
   updateVehicle: require('./update'),
   unregisterVehicle: require('./unregister')
}