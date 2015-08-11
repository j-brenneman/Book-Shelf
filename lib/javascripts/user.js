var bcrypt = require('bcrypt');

var signUpValidation = function (req, user) {
  var errors = [];
  if(req.body.username === ''){
    errors.push('Username Cannot be left Empty')
  }
  if(user){
    errors.push('The username already exists')
  }
  if(req.body.password != req.body.passwordCheck){
    errors.push('Passwords do Not Match')
  }
  if(req.body.password.length < 6 ){
    errors.push('Password Needs to be a length of 6 characters')
  }
  return errors;
}

var logout = function (req, cb) {
  req.session = null;
  cb();
}

var login = function (user, req) {
  var passwordConfirm = bcrypt.compareSync(req.body.password, user.password);
  var errors = [];
  if(!user){
    errors.push('Do Not Leave Fields Blank');
    return errors;
  }
  if(!user.name){
    errors.push('That Username does not Exist');
  }
  if(!passwordConfirm) {
    errors.push('Incorrect Password');
  }
  return errors;
}

module.exports = {
  signUpValidation: signUpValidation,
  logout: logout,
  loginValidation: login
}
