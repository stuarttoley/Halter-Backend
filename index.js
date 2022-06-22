const express = require('express');
const fetch = import('node-fetch');
const redis = require('redis');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')


const Cow = require('./Cow.Model.js')


const PORT = process.env.PORT || 5001;
const REDIS_PORT = process.env.PORT || 6379

const redisClient = redis.createClient(REDIS_PORT)

const app = express();

const database = 'halter'

const uri = `mongodb+srv://admin:raystu123@mission-6.kcvmu.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})   

mongoose.connection.on('connected', ()=>{
    console.log('you are connected MONGO server')
})

 // Name of COLLECTION you are trying to access
 let collection = `cows`

 // Create New Schema
 const Schema = mongoose.Schema;

 // Creates empty Schema to pull Collection
 const deafaultSchema = new Schema({})

 // Creates a new Mongoose model where it gets data from collectiom and places it in defaultSchema
 const documentPull = mongoose.model(collection, deafaultSchema)


 // gets list of cows
 app.get('/cows',  (req,res) => {
   
    documentPull.find({}).limit(20)
    .then(result => {
        res.send((result))
        console.log(result)
    })
})

app.post('/createcow', function(req, res) {
    var newCow = new Cow();

       newCow.collarId = req.body.collarId;
       newCow.cowNumber = req.body.Name;
       newCow.collarStatus = req.body.collarStatus;

       
    // newCow.lastLocation = req.body.lastLocation;
       
       newCow.save(function(err, data){
           if(err){
               console.log(error);
           }
           else{
            console.log(data)
            res.send("Cow inserted");
           }
       });
});










app.listen(5001, function() {
    console.log(`listening on ${PORT}`)
  })