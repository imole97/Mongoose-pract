const MONGO_URI = "mongodb+srv://imole97:elomioya97@mongoosetuts.ktwf5.mongodb.net/mongoosetuts?retryWrites=true&w=majority"

const mongoose = require('mongoose')
const Person = require('./Person') 

//connect mongoose with mongodb database
mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log('connected to db'))
.catch(err => console.log(err)) 

//create and save a record of a model
const person1 =  new Person({
    name: 'Imole',
    age: 22,
    favoriteFoods: ['rice', 'beans']
})
person1.save()
.then(doc => {console.log(doc)})
.catch(err => {
    console.log(err)
})

//create an save multiple people
const people = [
    {name: 'Usman', age: 25, favoriteFoods: ['yam', 'egg']},
    {name:'Yvonne', age: 28, favoriteFoods: ['amala', 'ewedu']},
    {name: 'Paul', age: 21, favoriteFoods: ['rice', 'salad']},
    {name: 'Christian', age: 20, favoriteFoods: ['bread', 'beans'] }
]
Person.create(people)
.then(doc => {console.log(doc)})
.catch(err => {console.log(err)})

// using model.find()
Person.find({name: 'Imole'}, function (err, arr){
    if(err){
        console.log(err)
    }
    console.log(arr)
})

//Use model.findOne() to Return a Single Matching Document from the Database
Person.findOne({favoriteFoods:'salad'}, (err, doc) => {
    console.log(doc)
})

// Use model.findById() to Search Your Database By _id
Person.findById('621198750e558790ca93f4ca', (err, doc) => {
    if (err){
        console.log(err)
    }
    console.log(doc)
})

//Perform Classic Updates by Running Find, Edit, then Save
Person.findById('621198750e558790ca93f4ca', (err, doc) => {
    if (err){
        console.log(err)
    } 
    doc.favoriteFoods.push('hamburger')
    doc.save()
    console.log(doc)
})

// Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({name: 'Usman'}, {$set: {age: 30}}, (err, doc) => {
    if(err){
        console.log(err)
    }
    console.log(doc)
})

// Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove('62124126cefce554e9a6c80f', (err, doc)=>{
    if(err){
        console.log(err)
    }
    console.log(doc)
})


// Delete Many Documents with model.remove()
Person.remove({name: 'Imole'}, (err, doc)=>{
    if(err) {
        console.log(err)
    }
    console.log(doc)
})

// Chain Search Query Helpers to Narrow Search Results
Person.find({favoriteFoods: 'rice'})
.sort({name: 'asc'})
.limit(2)
.select('-age')
.exec(function done(err,arr){
    if(err){
        console.log(err)
    }
    console.log(arr)
})