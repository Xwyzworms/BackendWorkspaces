const UploadImageSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UploadsValidator = {
  validateImageHeaders: (headers) => {
    console.log('this headers');
    const validationResult = UploadImageSchema.validate(headers);
    console.log(validationResult);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error);
    }
    return 1;
  },
};

module.exports = UploadsValidator;
