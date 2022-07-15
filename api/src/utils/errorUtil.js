import StatusCodes from './statusCodes.js';

const _errorLog = function(err){
  if(process.env.DEBUG) console.error(err.toString());
}
export const badRequestError = function (err, response) {
  if (typeof err === 'string') {
    err = new Error(err);
  }
  _errorLog(err);

  if (response === void 0) response = {};
  response.status = StatusCodes.BAD_REQUEST;
  response.error = err || new Error('Bad request');

  return response;
};

export const forbiddenError = function (err, response) {
  if (typeof err === 'string') {
    err = new Error(err);
  }
  _errorLog(err);

  if (response === void 0) response = {};
  response.status = StatusCodes.FORBIDDEN;
  response.error = err || new Error('Forbidden');

  return response;
};

export const internalServerError = function (err = "Error Occured", response) {
  _errorLog(err);

  if (response === void 0) response = {};
  response.status = StatusCodes.INTERNAL_SERVER_ERROR;
  response.error = err;

  return response;
};

export const notFoundError = function (err, response) {
  if (typeof err === 'string') {
    err = new Error(err);
  }
  _errorLog(err);

  if (response === void 0) response = {};
  response.status = StatusCodes.NOT_FOUND;
  response.error = err || new Error('Not found');

  return response;
};

export const validationError = function (err, response) {
  _errorLog(err);

  if (response === void 0) response = {};
  response.status = StatusCodes.UNPROCESSABLE_ENTITY;
  response.error = err.details[0].message;
  response.errors = err.details;

  return response;
};
