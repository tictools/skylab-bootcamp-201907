// module.exports = {
//     register : require('./register-property'),
//     retrieve : require('./retrieve-property'),
//     update : require('./update-property'),
//     unregister : require('./unregister-property')
// }

module.exports = {
   registerProperty: require('./register'),
   registerNewPropertyOwner: require('./register-owner'),
   unregisterPropertyOwner: require('./unregister-owner'),
   retrieveProperty: require('./retrieve'),
   updateProperty: require('./update'),
   retrieveAllOwnerProperties: require('./retrieve-all'),
   unregisterProperty: require('./unregister')
}

