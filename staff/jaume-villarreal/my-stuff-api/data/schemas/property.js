const mongoose = require('mongoose')
const { Schema , Schema : { ObjectId }} = mongoose

const { User } = require('../index')

module.exports = new Schema({
    address : {
        type : String,
        required : true
    } ,
    m2 : {
        type : Number,
        required : true
    },
    year : {
        type: Number,
        required: true
    },
    cadastre : {
        type : String,
        required : true
    },
    owners : [{ type: ObjectId , ref: User }]
})