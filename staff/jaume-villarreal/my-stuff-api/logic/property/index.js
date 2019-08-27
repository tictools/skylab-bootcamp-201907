// module.exports = {
//     register : require('./register-property'),
//     retrieve : require('./retrieve-property'),
//     update : require('./update-property'),
//     unregister : require('./unregister-property')
// }

module.exports = {
   registerProperty: require('./register'),
   retrieveProperty: require('./retrieve'),
   updateProperty: require('./update'),
   unregisterProperty: require('./unregister')
}

