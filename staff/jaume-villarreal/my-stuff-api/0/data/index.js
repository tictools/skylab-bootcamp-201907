const mongoose = require('mongoose')
const { model } = mongoose

const { user } = require('./schemas')
const { property } = require('./schemas')
const { vehicle } = require('./schemas')
const { card } = require('./schemas')

module.exports = {
    User : model('User' , user),
    Property : model('Property' , property),
    Vehicle : model('Vehicle' , vehicle),
    Card : model('Card' , card)
}