const Joi = require('joi');

const PostExportPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = PostExportPayloadSchema;
