require('dotenv').config()
const { env : { DB_URL , PORT } } = process

const express = require('express')

const router = require('./routes')

const mongoose = require('mongoose')

const { name , version } = require('./package')

mongoose.connect(DB_URL , { useNewUrlParser : true , useUnifiedTopology : true} )
    .then( () => {
        const app = express()

        app.use('/api' , router)
        
        app.listen(PORT , () => console.log(`${name} ${version} up runnig on port ${PORT}`))
    })

process.on('SIGNINT' , () => {
    mongoose.disconnect()
    process.exit(0)
    console.log(`${name} ${version} shutting down, disconnecting from database...`)
})
