const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({
    number : {
        type : Number,
        required : true,
        match : /\d{4}-?\d{4}-?\d{4}-?\d{4}/
    },

    expiration : {
        expiry : Date
    }
})