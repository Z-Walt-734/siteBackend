const Validator = require('validator');
const isEmpty = require('is-empty');

signupValidator = (data) =>{
  const errors = {};

  let {fName, lName, email, password} = data;

  fName = isEmpty(fName) ? '' : fName;
  lName = isEmpty(lName) ? '' : lName;
  email = isEmpty(email) ? '' : email;
  password = isEmpty(password) ? '' : password;

  if (Validator.isEmpty(fName)) {
    errors.fName = 'Username Required';
  }

  if (Validator.isEmpty(lName)) {
    errors.lName = 'Username Required';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email Required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Invalid Email';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password Required';
  } else if (!Validator.isLength(password, {min: 8, max: 30})) {
    errors.password = 'Invalid Password';
  }

  return {errors, isValid: isEmpty(errors)};
};

module.exports = signupValidator;
