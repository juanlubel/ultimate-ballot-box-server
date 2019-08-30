'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = Schema({
    name: String,
    votes: { type: Number, default: 0 }
})

module.exports = mongoose.model('Student', StudentSchema)
