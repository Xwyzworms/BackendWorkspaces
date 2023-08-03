const InvariantError = require('../../exceptions/InvariantError');
const { PostAuthenticationPayloadSchema, PutAuthenticationPayloadSchema, validateDeleteAuthenticationPayload, DeleteAuthtenticationPayloadSchema} = require('./schema');
const AuthenticationsValidator = {
    
    validatePostAuthenticationPayload: (payload) => {
        const validationResult = PostAuthenticationPayloadSchema.validate(payload);
        if(validationResult.error) errorHandler(validationResult.error.message)
    },
    validatePutAuthenticationPayload: (payload) => {
        const validationResult = PutAuthenticationPayloadSchema.validate(payload);
        if(validationResult.error) errorHandler(validationResult.error.message)
    },
    validateDeleteAuthenticationPayload: (payload) => {
        const validationResult = DeleteAuthtenticationPayloadSchema.validate(payload);
        if(validationResult.error) errorHandler(validationResult.error.message)
    }
}

const errorHandler =  (message) => {
    throw new InvariantError(message);
}

module.exports = AuthenticationsValidator;