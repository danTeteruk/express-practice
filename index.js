var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userModel = require("./model/model.js")
var port = 3000;
var HttpError = require("./httpError")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(function(req, res, next) {
  if (req.headers.authorization !== '123') {
    throw new HttpError(401, 'wrong access key');
  } else {
    next();
  }
});



app.get('/users', function(req, res, next) {
  var users = req.body;
  userModel.getUsers(function(err, users) {
    if (err && err.status) return next(new HttpError(err.status, err.message));
    if (err) return next(err);
    res.send(users);

  });
});

app.get('/users/:UserId', function(req, res, next) {
  userModel.getUser(req.params.UserId, function(err, users) {
    if (err && err.status) return next(new HttpError(err.status, err.message));
    if (err) return next(err);
    res.send(users);
  });
});

app.post('/users', function(req, res, next) {
  var user = {
    name : req.body.name,
    password : req.body.password
  }
  userModel.addUser(user, function(err, users) {
    if (err && err.status) return next(new HttpError(err.status, err.message));
    if (err) return next(err);
    res.send(users);
  });
});

app.delete('/users/:UserId', function(req, res, next) {
  userModel.deleteUser(req.params.UserId, function(err, users) {
    if (err && err.status) return next(new HttpError(err.status, err.message));
    if (err) return next(err);
    res.send(users);
  });
});



app.listen(port, function() {
  console.log("Listening on" + port);
});
