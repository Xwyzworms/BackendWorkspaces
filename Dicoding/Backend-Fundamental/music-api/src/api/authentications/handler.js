class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this.authenticationsService = authenticationsService;
    this.validator = validator;
    this.tokenManager = tokenManager;
    this.usersService = usersService;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);

    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);

    this.deleteAuthenticationhandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    this.validator.validatePostAuthenticationPayload(request.payload);

    // Validate user credential ( need to be registered )
    const { username, password } = request.payload;

    const id = await this.usersService.verifyUserCredentials({ username, password });

    // Create Token manager
    const accessToken = await this.tokenManager.createAccessToken({ id });
    const refreshToken = await this.tokenManager.generateRefreshToken({ id });

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request, h) {
    this.validator.validatePutAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;
    await this.authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = this.tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = this.tokenManager.generateAcessToken({ id });

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
      },
    });
  }

  async deleteAuthenticationHandler(request, h) {
    this.validator.validateDeleteAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;

    await this.usersService.verifyRefreshToken(refreshToken);
    await this.authenticationsService.deleteRefreshToken(refreshToken);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus autentikasi',
    });

    return response;
  }
}

module.exports = AuthenticationsHandler;
