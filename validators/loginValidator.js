const Validator = require('validator');
const isEmpty = require('is-empty');

const loginValidator = (data) => {
  const errors = {};

  let {email, password} = data;

  email = isEmpty(email) ? '' : email;
  password = isEmpty(password) ? '' : password;

  if (Validator.isEmpty(email)) {
    errors.email = 'Email Required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Invalid Email';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Invalid Password';
  } else if (!Validator.isLength(password, {min: 8, max: 30})) {
    errors.password = 'Invalid Password';
  }

  return {errors, isValid: isEmpty(errors)};
};

module.exports = loginValidator;
