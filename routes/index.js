var express = require('express');
var router = express.Router();
var db = require('./../lib/javascripts/mongo');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.session);
  res.render('index', {title: 'Book Shelf'});
});
// Discovery Library
router.get('/library/books', function (req, res, next) {
  db.findBook(req).then(function (books) {
    res.render('books/index', {collection: books});
  })
});


module.exports = router;
