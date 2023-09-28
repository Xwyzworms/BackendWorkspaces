const PostExportPayloadSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const ExportValidator = {
  validatePostPlaylistExportPayload: (payload) => {
    const validationResult = PostExportPayloadSchema.validate(payload);
    if (validationResult.error || validationResult.value === undefined) {
      if (validationResult) {
        throw new InvariantError(validationResult.error.message);
      }
    }
  },
};

module.exports = ExportValidator;
