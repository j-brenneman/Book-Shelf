var express = require('express');
var router = express.Router();
var db = require('./../lib/javascripts/mongo');
var account = require('./../lib/javascripts/user');

// SignUp / New Account
router.get('/new_account', function (req, res, next) {
  res.render('books/new_account');
});
router.post('/new_account', function (req, res, next) {
  db.createAccount(req, function (errors) {
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
  db.login(req, function (errors) {
    if(errors){
      res.render('books/login', {errors: errors})      
    } else {
      res.redirect('/library/books')
    }
  })
})
// Logout
router.get('/logout', function (req, res, next) {
  account.logout(req, function () {
    res.redirect('/');
  })
});

module.exports = router;
