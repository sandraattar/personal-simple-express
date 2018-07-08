const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db
//connecting to the database
MongoClient.connect('mongodb://sandraattar:sandraattar1@ds127781.mlab.com:27781/test-beit-db', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 8000, () => {
    console.log('listening on 8000')
  })
})
//using ejs as our templating package
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
//api (simple interface that can handle a response to a user's request):
//when the user makes a get request to the server
app.get('/', (req, res) => {
  //.collection, .find, .toArray are all methods that enable us to pull information from db
  //went to db, looked for messages collection, find me every single doc in the collection and turn it into array of objects
  //every time we refresh the page this action will be triggered
  // db.collection('postings').find().toArray((err, result) => {
  //   if (err) return console.log(err)
  //   //responding with trndering of ejs and result (array of ojects)
  //   res.render('index.ejs', {postings: result})
  // })
  db.collection('postings').find().toArray((err, result) => {
    if (err) return console.log(err)
    //responding with trndering of ejs and result (array of ojects)
    res.render('index.ejs', {postings: result})
  })
})


app.post('/postings', (req, res) => {
  db.collection('postings').save({name: req.body.name, location: req.body.location, status: req.body.status}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/postings', (req, res) => {
  db.collection('postings')
  .findOneAndUpdate({name: req.body.name, location: req.body.location }, {
    $set: {
      status: req.body.status
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/postings', (req, res) => {
  db.collection('postings').findOneAndDelete({name: req.body.name, location: req.body.location, status: req.body.status}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
