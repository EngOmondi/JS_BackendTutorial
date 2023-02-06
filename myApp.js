var express = require('express');
var app = express();




var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');







  app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });




// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));









var dbConn = mongodb.MongoClient.connect('mongodb+srv://engomondiii:Fidel1234@cluster0.q6sghd3.mongodb.net/?retryWrites=true&w=majority');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/post-feedback', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons
        db.collection('feedbacks').insertOne(req.body);
    });    
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/view-feedbacks',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});














 module.exports = app;
