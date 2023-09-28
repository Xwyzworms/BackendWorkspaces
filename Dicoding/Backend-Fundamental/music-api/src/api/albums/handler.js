const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsHandler {
  constructor(service, userService, memCacheService, validator) {
    this.service = service;
    this.userService = userService;
    this.memCacheService = memCacheService;
    this.validator = validator;

    this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);

    this.postAlbumByIdLikes = this.postAlbumByIdLikes.bind(this);
    this.deleteAlbumByIdLikes = this.deleteAlbumByIdLikes.bind(this);
    this.getAlbumByIdLikes = this.getAlbumByIdLikes.bind(this);
  }

  async getAlbumByIdLikes(request, h) {
    const { id } = request.params;
    let result;
    try {
      result = await this.memCacheService.get(`musicAlbum:${id}`);
      const response = h.response({
        status: 'success',
        data: {
          likes: parseInt(result, 10),
        },
      });
      response.header('X-Data-Source', 'cache');
      return response;
    } catch (e) {
      result = await this.service.getLikesByAlbumId(id);
      await this.memCacheService.set(`musicAlbum:${id}`, result);
      const response = h.response({
        status: 'success',
        data: {
          likes: parseInt(result, 10),
        },
      });
      return response;
    }
  }

  async postAlbumByIdLikes(request, h) {
    const { id } = request.params;
    const { username } = request.auth.credentials;

    await this.userService.verifyUserCredentialsByUsername(username);
    await this.service.getAlbumById(id);
    await this.service.isAlbumLikedByUser(id, username);
    await this.service.insertLikesByAlbumId(id, username);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan likes',
    });
    response.code(201);
    await this.memCacheService.del(`musicAlbum:${id}`);
    return response;
  }

  async deleteAlbumByIdLikes(request, h) {
    const { id } = request.params;
    const { username } = request.auth.credentials;

    await this.userService.verifyUserCredentialsByUsername(username);
    await this.service.getAlbumById(id);
    await this.service.deleteLikesByAlbumId(id, username);

    const response = h.response({
      status: 'success',
      message: 'Berhasil unlike ',
    });
    response.code(200);
    await this.memCacheService.del(`musicAlbum:${id}`);
    return response;
  }

  async postAlbumsHandler(request, h) {
    this.validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;

    const id = await this.service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId: id,
      },
    });

    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this.service.getAlbumById(id);
    const response = h.response({
      status: 'success',
      data: {
        album,
      },
    });

    response.code(200);
    return response;
  }

  async putAlbumByIdHandler(request, h) {
    this.validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;
    await this.service.editAlbumById(id, { name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this.service.deleteAlbumById(id);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });

    response.code(200);
    return response;
  }
}

module.exports = AlbumsHandler;
