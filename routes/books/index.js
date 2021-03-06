var express = require('express');
var router = express.Router();
var db = require('./../../lib/javascripts/mongo.js');

// My Shelf
router.get('/books/shelf/:id', function (req, res, next) {
  db.findBooks(req).then(function (collection) {
    res.render('books/shelf', {collection: collection})
  })
})
// New Book
router.post('/books/:id', function (req, res, next) {
  db.bookInsert(req).then(function () {
    res.redirect('/library/books/shelf/' + res.locals.userId);
  })
});
// Edit Book
router.get('/books/:id', function (req, res, next) {
  db.findBook(req).then(function (book) {
    console.log(book.quotes);
    res.render('books/edit', {book: book})
  })
})
router.post('/books/:id/update', function (req, res, next) {
  db.updateBook(req).then(function () {
    res.redirect('/library/books/shelf/' + res.locals.userId)
  })
})
// Delete Book
router.post('/books/:id/remove', function (req, res, next) {
  db.removeBook(req).then(function () {
    res.redirect('/library/books/shelf/' + res.locals.userId)
  })
})


module.exports = router;
