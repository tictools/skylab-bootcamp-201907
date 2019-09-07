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
router.get('/tutors' , tokenMiddleware , retrieveTutor)
router.patch('/tutors' , [jsonBodyParser , tokenMiddleware] , updateTutor)

// ADMIN
const registerAdmin = require('./register-admin')
const authenticateAdmin = require('./authenticate-admin')
const retrieveAdmin = require('./retrieve-admin')
const updateAdmin = require('./update-admin') 

router.post('/admins' , jsonBodyParser , registerAdmin)
router.post('/admins/auth' , jsonBodyParser , authenticateAdmin)
router.get('/admins' , tokenMiddleware , retrieveAdmin)
router.patch('/admins' , [jsonBodyParser , tokenMiddleware] , updateAdmin)

// STUDENT
const registerStudent = require('./register-student')
const retrieveStudent = require('./retrieve-student')
// const updateAdmin = require('./update-admin') 

router.post('/students' , jsonBodyParser , registerStudent)
router.get('/students/:id' , tokenMiddleware , retrieveStudent)
// router.patch('/admins' , [jsonBodyParser , tokenMiddleware] , updateAdmin)

module.exports = router