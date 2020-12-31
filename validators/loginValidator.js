const Validator = require('validator');
const isEmpty = require('is-empty');

const loginValidator = (data) => {
  const errors = {};

  let {input, password} = data;

  input = isEmpty(input) ? '' : input;
  password = isEmpty(password) ? '' : password;

  if (Validator.isEmpty(input)) {
    errors.input = 'Email or username Required';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Invalid Password';
  } else if (!Validator.isLength(password, {min: 8, max: 30})) {
    errors.password = 'Invalid Password';
  }

  return {errors, isValid: isEmpty(errors)};
};

module.exports = loginValidator;
