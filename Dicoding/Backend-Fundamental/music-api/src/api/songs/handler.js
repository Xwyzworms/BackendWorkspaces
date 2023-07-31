class SongsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postSongsHandler = this.postSongsHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongsHandler(request, h) {
    const {
      title, year,
      genre, performer,
      duration, albumId,
    } = request.payload;
    this.validator.validateMusicPayload(request.payload);

    const id = await this.service.addSong({
      title, year, genre, performer, duration, albumId,
    });
    const response = h.response({
      status: 'success',
      data: {
        songId: id,
      },
    });
    response.code(200);
    return response;
  }

  async getSongsHandler(request, h) {
    const result = await this.service.getSongs();
    const response = h.response({
      status: 'success',
      data: {
        songs: result,
      },
    });

    response.code(200);
    return response;
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const result = await this.service.getSongById(id);
    const response = h.response({
      status: 'success',
      data: {
        song: result,
      },
    });

    response.code(200);
    return response;
  }

  async putSongByIdHandler(request, h) {
    const { id } = request.params;
    await this.service.editSongById(id, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Berhasil memperbarui lagu',
    });

    return response;
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;

    this.service.deleteSongById(id);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus lagu',
    });

    response.code(200);
    return response;
  }
}

module.exports = SongsHandler;
