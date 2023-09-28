const InvariantError = require('../../exceptions/InvariantError');
const {
  PostPlaylistsAddPayloadSchema,
  PostSongPlaylistsByIdPayloadSchema,
  DeleteSongPlaylistsByIdPayloadSchema,
} = require('./schema');

const validationErrorHandler = (validationResult) => {
  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
};

const PlaylistsValidator = {
  validatePostPlaylistsAddPayload: (payload) => {
    const validationResult = PostPlaylistsAddPayloadSchema.validate(payload);
    validationErrorHandler(validationResult);
  },

  validatePostSongPlaylistsByIdPayload: (payload) => {
    const validationResult = PostSongPlaylistsByIdPayloadSchema.validate(payload);
    validationErrorHandler(validationResult);
  },

  validateDeleteSongPlaylistsByIdPayload: (payload) => {
    const validationResult = DeleteSongPlaylistsByIdPayloadSchema.validate(payload);
    validationErrorHandler(validationResult);
  },

};

module.exports = PlaylistsValidator;
