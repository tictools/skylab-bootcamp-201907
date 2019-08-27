// module.exports = { 
//     user : require('./user'),
//     property : require('./property'),
//     vehicle : require('./vehicle'),
//     card : require('./card')
// }

module.exports = {
   ...require('./user'),
   ...require('./vehicle'),
   ...require('./property'),
   ...require('./card')
}