var bcrypt = require('bcrypt');
var account = require('./../../lib/javascripts/user');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/library");
mongoose.set('debug', true);

var librarySchema = new mongoose.Schema({
    title: String,
    author: String,
    pdfPath: String,
    imageUrl: String,
    userID: String
});

var quotesSchema = new mongoose.Schema({
    userID: String,
    bookID: String,
    quote: String
});

var usersSchema = new mongoose.Schema({
    name: String,
    password: String,
    favoriteBooks: Array,
    favoriteQuotes: Array
});

var Library =  mongoose.model("Book", librarySchema);
var Quotes = mongoose.model('Quote', quotesSchema);
var Users = mongoose.model('User', usersSchema);

var bookInsert = function (req, cb) {
  console.log(req.body);
  Library.create({title: req.body.title, author: req.body.author, userID: req.params.id,

                 }
  ).then(function (book) {
    var quotes = req.body.quotes;
    var trigger = 0;
    quotes.forEach(function (quote) {
      trigger ++;
      Quotes.create({userID: req.params.id, bookID: book.id, quote: quote})
      .then(function () {
        if(trigger === quotes.length){
          cb();
        }
      })
    })
  })  
}

var createAccount = function (req, cb) {
  var hash = bcrypt.hashSync(req.body.password, 8);
  Users.findOne({name: req.body.username}).then(function (user) {
    return account.signUpValidation(req, user);
  }).then(function (errors) {
    if(errors.length === 0) {
      Users.create({name: req.body.username, password: hash});
      req.session.username = req.body.username;
      cb(false);
    } else {
      cb(errors);
    }
  });
}

var login = function (req, cb) {
  var errors = [];
  Users.findOne({name: req.body.username}).then(function (user) {
    return account.loginValidation(user, req)
  }).then(function (errors) {
    if(errors.length === 0) {
      req.session.username = req.body.username;
      cb(false);
    } else {
      cb(errors);
    }
  })
}

var findUser = function (req, redirect, next) {
  if(!req.session.username){
    redirect();
  } else {
    Users.findOne({name: req.session.username}).then(function (user) {
      if(user){
        next(user)
      } else {
        redirect()
      }
    });
  }
}

module.exports = {
  bookInsert: bookInsert,
  createAccount: createAccount,
  login: login,
  findUser: findUser
}
