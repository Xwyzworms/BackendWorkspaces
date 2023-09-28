const Joi = require('joi');

const UploadImageSchema = Joi.object({
  'content-type': Joi.string().valid(
    'image/apng',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp',
  ).required(),
}).unknown().options({ allowUnknown: false });

module.exports = UploadImageSchema;
