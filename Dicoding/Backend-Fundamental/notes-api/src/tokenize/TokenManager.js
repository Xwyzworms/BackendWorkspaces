const Jwt = require("@hapi/jwt");
const InvariantError = require("../exceptions/InvariantError");


const TokenManager = {
    generateAccessToken(payload) {
        return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
    },
    generateRefreshToken(payload) {
        return Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
    },
    verifyRefreshToken(refreshToken) {
        try {

            const tokenArtifacts = Jwt.token.decode(refreshToken)
            Jwt.token.verifySignature(tokenArtifacts, process.env.REFRESH_TOKEN_KEY);
            console.log(tokenArtifacts.decoded);
            const { payload } = tokenArtifacts.decoded;
            return payload;
        } catch(e) {
            throw new InvariantError('Refresh token tidak valid');
        }
    }
    
}

module.exports = TokenManager;