const mongoose = require('mongoose')
const { Schema  , Schema : { ObjectId }} = mongoose

const { User } = require('../index')

module.exports = new Schema({
    brand : {
        type : String,
        required : true
    },
    model : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        required : true,
        enum : ['tourism' , 'suv' , 'van' , 'coupe' , 'cabrio' , 'roadster' , 'truck'],
        default : 'tourism'
    },
    color : {
        type : String,
        required : true
    },
    license : {
        type : String,
        required : true
    },
    owners : [{
        type : ObjectId,
        ref : 'User'
    }]
})