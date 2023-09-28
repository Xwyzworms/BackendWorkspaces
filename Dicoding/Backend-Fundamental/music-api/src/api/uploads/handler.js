class UploadsHandler {
  constructor(service, albumsService, validator) {
    this.service = service;
    this.validator = validator;
    this.albumService = albumsService;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;
    this.validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this.service.writeFile(cover, cover.hapi);
    const filepath = `http://${process.env.HOST}:${process.env.PORT}/albums/images/${filename}`;
    await this.albumService.editAlbumCoverUrlById(id, filepath);

    // Write to database
    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });

    response.code(201);
    return response;
  }
}
module.exports = UploadsHandler;
