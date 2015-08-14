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

var login = function (user, req) {
  var errors = [];
  if(req.body.username === '' || req.body.password === ''){
    errors.push('Do Not Leave Fields Blank');
    return errors;
  }
  if(!user){
    errors.push('That Username does not Exist');
    return errors;
  }
  var passwordConfirm = bcrypt.compareSync(req.body.password, user.password);
  if(!passwordConfirm) {
    errors.push('Incorrect Password');
  }
  return errors;
}

module.exports = {
  signUpValidation: signUpValidation,
  loginValidation: login
}
