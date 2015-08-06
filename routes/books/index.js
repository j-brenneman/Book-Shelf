var express = require('express');
var router = express.Router();

// Discovery Library
router.get('/books', function (req, res, next) {
  res.render('books/index');
})
// Personal Book Shelf
router.get('/books/shelf', function (req, res, next) {
  res.render('books/shelf');
}) ;




module.exports = router;
