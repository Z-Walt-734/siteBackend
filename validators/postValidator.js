const Validator = require('validator');
const isEmpty = require('is-empty');

postValidator = (data) => {
  const errors = {};

  let {title, body} = data;

  title = isEmpty(title) ? '' : title;
  body = isEmpty(body) ? '' : body;

  if (Validator.isEmpty(title)) {
    errors.title = 'Title Required';
  }
  if (Validator.isEmpty(body)) {
    errors.body = 'Body Required';
  }

  return {errors, isValid: isEmpty(errors)};
};

module.exports = postValidator;
