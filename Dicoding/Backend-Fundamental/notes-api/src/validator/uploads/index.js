const ImageContentHeaderSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');
const UploadsValidator = {
	validateImageHeaders: (headers) => {
		const validationResult = ImageContentHeaderSchema.validate(headers);

		if(validationResult.error) {
			throw new InvariantError(validationResult.error);
		}
	}
}


module.exports = UploadsValidator;
