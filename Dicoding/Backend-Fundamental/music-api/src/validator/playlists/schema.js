const Joi = require('joi');

const PostPlaylistsAddPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PostSongPlaylistsByIdPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const DeleteSongPlaylistsByIdPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = {
  PostPlaylistsAddPayloadSchema,
  PostSongPlaylistsByIdPayloadSchema,
  DeleteSongPlaylistsByIdPayloadSchema,
};
