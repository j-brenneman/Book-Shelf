var express = require('express');
var router = express.Router();

// Discovery Library
router.get('/books', function (req, res, next) {
  res.render('books/index');
})
// Personal Book Shelf
router.get('/books/shelf', function (req, res, next) {
  res.render('books/shelf');
});
// New Book
router.get('/books/new', function (req, res, next) {
  res.render('books/new')
})
router.post('/books/new', function (req, res, next) {
  console.log(req.body);
  res.redirect('/library/books/shelf')
})




module.exports = router;
