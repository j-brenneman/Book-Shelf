var express = require('express');
var router = express.Router();
var db = require('./../lib/javascripts/mongo');

// SignUp / New Account
router.get('/new_account', function (req, res, next) {
  res.render('books/new_account');
});
router.post('/new_account', function (req, res, next) {
  db.createAccount(req).then(function (errors) {
    if(errors){
      res.render('books/new_account', {errors: errors});
    } else {
      res.redirect('/library/books');
    }
  });
});
// Login
router.get('/login', function (req, res, next) {
  res.render('books/login');
})
router.post('/login', function (req, res, next) {
  db.login(req).then(function (errors) {
    if(errors){
      res.render('books/login', {errors: errors})
    } else {
      res.redirect('/library/books')
    }
  })
})
// Logout
router.get('/logout', function (req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
