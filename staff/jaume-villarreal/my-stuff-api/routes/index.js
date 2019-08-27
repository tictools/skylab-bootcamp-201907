const { Router } = require('express')
const router = Router()

const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const jwtMiddleware = require('../helpers/token-middleware.js')

const { registerUser , authenticateUser , retrieveUser , updateUser , unregisterUser } = require('./user')
const { registerProperty } = require('./property')

// USER routes
router.post('/users' , jsonBodyParser , registerUser)
router.post('/auth' , jsonBodyParser , authenticateUser)
router.get('/users/:id' , [jsonBodyParser , jwtMiddleware] , retrieveUser)
router.patch('/users/:id' , [jsonBodyParser , jwtMiddleware] , updateUser)
router.delete('/users/:id' , [jsonBodyParser , jwtMiddleware] , unregisterUser)

// PROPERTIES routes
// router.post('/properties' , jsonBodyParser , registerProperty)

module.exports = router

