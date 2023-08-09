class UsersHandler {
  constructor(usersService, validator) {
    this.usersService = usersService;
    this.validator = validator;

    this.postUsersHandler = this.postUsersHandler.bind(this);
  }

  async postUsersHandler(request, h) {
    this.validator.validateUserPayload(request.payload);

    const id = await this.usersService.addUser(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        userId: id,
      },
    });

    return response;
  }
}

module.exports = UsersHandler;
