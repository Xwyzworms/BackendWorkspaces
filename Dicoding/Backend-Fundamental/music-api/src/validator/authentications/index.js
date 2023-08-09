const InvariantError = require('../../exceptions/InvariantError');
const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('./schema');

const validationErrorHandler = (validationResult) => {
  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
};

const AuthenticationValidator = {

  validatePostAuthenticationPayload: (payload) => {
    const validationResult = PostAuthenticationPayloadSchema.validate(payload);

    validationErrorHandler(validationResult);
  },

  validatePutAuthenticationPayload: (payload) => {
    const validationResult = PutAuthenticationPayloadSchema.validate(payload);

    validationErrorHandler(validationResult);
  },

  validateDeleteAuthenticationPayload: (payload) => {
    const validationResult = DeleteAuthenticationPayloadSchema.validate(payload);

    validationErrorHandler(validationResult);
  },
};

module.exports = AuthenticationValidator;
