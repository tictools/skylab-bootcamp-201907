const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({
    category: {
        type: String,
        enum: ['part' , 'full'],
        required: true
    },
    morningPermanence: {
        type: Boolean,
        required: true
    },
    afternooonPermanence: {
        type: Boolean,
        required: true
    },
    lunch: {
        type: Boolean,
        required: true
    }
})