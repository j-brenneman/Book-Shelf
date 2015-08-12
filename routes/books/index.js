var express = require('express');
var router = express.Router();
var db = require('./../../lib/javascripts/mongo.js');


// Personal Book Shelf
router.get('/books/shelf/:id', function (req, res, next) {
  res.render('books/shelf');
});
// New Book
router.get('/books/:id', function (req, res, next) {
    res.render('books/new');
});
router.post('/books/:id', function (req, res, next) {
  db.bookInsert(req, function () {
    res.redirect('/library/books/shelf/' + res.locals.userId);
  })
});



module.exports = router;
