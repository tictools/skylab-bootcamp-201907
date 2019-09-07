const { Router } = require('express')
const router = Router()

const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const tokenMiddleware = require('../helpers/token-middleware')

// TUTOR
const registerTutor = require('./register-tutor')
const authenticateTutor = require('./authenticate-tutor')
const retrieveTutor = require('./retrieve-tutor')
const updateTutor = require('./update-tutor') 

router.post('/tutors' , jsonBodyParser , registerTutor)
router.post('/tutors/auth' , jsonBodyParser , authenticateTutor)
router.get('/tutors' , [jsonBodyParser , tokenMiddleware] , retrieveTutor)
router.patch('/tutors' , [jsonBodyParser , tokenMiddleware] , updateTutor)

module.exports = router