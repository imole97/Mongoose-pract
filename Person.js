const mongoose = require('mongoose')
// const { stringify } = require('nodemon/lib/utils')

const Schema = mongoose.Schema

const personSchema = new Schema({
    name:{
        type: String,
        required: true
    }, 
    age: Number,
    favoriteFoods: [String]
}, {timestamps: true})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
