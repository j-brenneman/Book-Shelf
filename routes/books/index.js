var express = require('express');
var router = express.Router();
var db = require('./../../lib/javascripts/mongo.js');


// Personal Book Shelf
router.get('/books/shelf', function (req, res, next) {
  res.render('books/shelf');
});
// New Book
router.get('/books/new', function (req, res, next) {
    res.render('books/new');
});
router.post('/books/new', function (req, res, next) {
  db.bookInsert(req.body, function () {
    res.redirect('/library/books/shelf');
  })
});




module.exports = router;
