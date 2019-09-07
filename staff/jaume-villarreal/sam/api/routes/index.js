const { Router } = require('express')
const router = Router()

const boydParser = require('body-parser')
const jsonBodyParser = boydParser.json()

// const tokenMiddleware = require('../helpers/token-middleware')

// TUTOR
const registerTutor = require('./register-tutor')

router.post('/tutors' , jsonBodyParser , registerTutor)

module.exports = router