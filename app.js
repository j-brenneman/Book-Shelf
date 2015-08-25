var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var library = require('./routes/books/index');
var db = require('./lib/javascripts/mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cookie session
app.use(session({
  name: 'session',
  keys: ['sdfk5j45khkh35', 'dfgkjhf45kjh5']
}))

app.use(function (req, res, next) {
  db.findUser(req, function () {
    next();
  }, function (user) {
    res.locals.username = req.session.username;
    res.locals.userId = user._id;
    next();
  })
});
app.use('/', routes);
app.use('/users', users);
app.use(function (req, res, next) {
  db.findUser(req, function () {
    res.redirect('/users/new_account');
  }, function () {
    next();
  });
});
app.use('/library', library);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// for use in production
if (app.get('env') === 'production') {
    app.listen(3000);
  }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
