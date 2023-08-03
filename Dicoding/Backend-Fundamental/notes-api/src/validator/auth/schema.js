const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const PutAuthenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string().required()
});

const DeleteAuthtenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string().required()
})

module.exports = {
    PostAuthenticationPayloadSchema,
    PutAuthenticationPayloadSchema,
    DeleteAuthtenticationPayloadSchema,
}