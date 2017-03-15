

//Express 3.x is a light-weight web application framework to 
//help organize your web application into an MVC architecture on 
//the server side. 
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
//Express allows us to add middlewares like body-parser 
//to our application with the use method.

//we can connect to MongoDB through the Mongo.Client‘s 
const MongoClient = require('mongodb').MongoClient

var db
// set the view
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://admin:admin@ds131340.mlab.com:31340/hussein-mongo-db', (err, database) => {
  if (err) return console.log(err)
    db =database
  // ... start the server
  app.listen(3000, function() {
  console.log('listening on 3000')
  })
})

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// below that tells the server what to do when the path(/) is matched. It takes in two arguments,
// a request object and a response object:

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

//On our server, we can handle this POST request with a post method that Express provides. 
// It takes the same arguments as the GET method:

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
//============================

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: "hussein"},
  (err, result) => {
    if (err) return res.send(500, err)

    res.send(result)
  })
})
