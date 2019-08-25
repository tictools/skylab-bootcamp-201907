const { Router } = require('express')
const router = Router()

const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const jwtMiddleware = require('../helpers/token-middleware.js')

const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const updateUser = require('./update-user')
const unregisterUser = require('./unregister-user')

router.post('/users' , jsonBodyParser , registerUser)
router.post('/auth' , jsonBodyParser , authenticateUser)
router.get('/users/:id' , [jsonBodyParser , jwtMiddleware] , retrieveUser)
router.patch('/users/:id' , [jsonBodyParser , jwtMiddleware] , updateUser)
router.delete('/users/:id' , [jsonBodyParser , jwtMiddleware] , unregisterUser)

module.exports = router

