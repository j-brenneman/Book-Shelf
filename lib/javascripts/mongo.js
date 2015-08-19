var bcrypt = require('bcrypt');
var account = require('./../../lib/javascripts/user');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/library");
mongoose.set('debug', true);

var librarySchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    imageUrl: String,
    publishedDate: String,
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

// never go more than 2 levels deep with promises

// find().then(function (person) {
//   return find().then(function (addresses) {
//     return find().then(function (geocodes) {
//       return geocodes
//     })
//   })
// }).then(function (x) {
//   x?? // person, addresses, and geocodes
// })


var bookInsert = function (req) {
  console.log(req.body);
  return Library.create(
    { title: req.body.title, author: req.body.author,
      description: req.body.description, imageUrl: req.body.imageUrl,
      publishedDate: req.body.published, userID: req.params.id
    }
  ).then(function (book) {
    console.log(req.body.quotes);
    if(req.body.quotes) {
      var quotes = req.body.quotes;
      if(typeof quotes === 'string'){
        quotes = [quotes];
      }
      // TODO: refactor to return Promise.all (use `map` as well)
      quotes.forEach(function (quote) {
        Quotes.create({userID: req.params.id, bookID: book.id, quote: quote})
      })
    }
  })
}

var findBooks = function (req) {
  return Library.find({userID: req.params.id}).then(function (books) {
    return Promise.all(books.map(function (book) {
      return Quotes.find({bookID: book._id}).then(function (quote) {
        book.quotes = quote;
        return book;
      })
    }))
  })
}

var findBook = function (req) {
  return Library.find({_id: req.params.id})
}

var updateBook = function (req) {
  return Library.findOneAndUpdate({_id: req.params.id},
                                  {title: req.body.title, author: req.body.author,
                                   description: req.body.description, imageUrl: req.body.imageUrl,
                                   publishedDate: req.body.published
                                  })
}

var removeBook = function (req) {
  return Library.remove({_id: req.params.id});
}

var createAccount = function (req) {
  var hash = bcrypt.hashSync(req.body.password, 8);
  return Users.findOne({name: req.body.username}).then(function (user) {
    return account.signUpValidation(req, user);
  }).then(function (errors) {
    if(errors.length === 0) {
      // refactor this code to also set the user's _id on the session
      Users.create({name: req.body.username, password: hash});
      req.session.username = req.body.username;
      return false;
    } else {
      return errors;
    }
  });
}

var login = function (req) {
  var errors = [];
  return Users.findOne({name: req.body.username}).then(function (user) {
    return account.loginValidation(user, req)
  }).then(function (errors) {
    if(errors.length === 0) {
      req.session.username = req.body.username;
      return false;
    } else {
      return errors;
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
  findBooks: findBooks,
  findBook: findBook,
  updateBook: updateBook,
  removeBook: removeBook,
  createAccount: createAccount,
  login: login,
  findUser: findUser
}
